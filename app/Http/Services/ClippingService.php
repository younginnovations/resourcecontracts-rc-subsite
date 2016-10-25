<?php namespace App\Http\Services;

use App\Http\Models\Clip\Clip;
use Exception;
use Illuminate\Contracts\Filesystem\Factory as Filesystem;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use LynX39\LaraPdfMerger\Facades\PdfMerger;
use LynX39\LaraPdfMerger\PdfManage;
use Vsmoraes\Pdf\Pdf;
use ZipArchive;

/**
 * Class ClippingService
 * @package App\Http\Services
 */
class ClippingService
{
    /**
     * @var APIService
     */
    public $api;
    /**
     * @var Clip
     */
    private $clip;
    /**
     * @var PdfMerger|PDFManage
     */
    public $pdf;
    /**
     * @var Filesystem
     */
    public $file;
    /**
     * @var Pdf
     */
    private $hpdf;

    /**
     * @param APIService          $api
     * @param Clip                $clip
     * @param PdfMerger|PdfManage $pdf
     * @param Filesystem          $file
     * @param Pdf                 $hpdf
     */
    public function __construct(APIService $api, Clip $clip, PdfManage $pdf, Filesystem $file, Pdf $hpdf)
    {
        $this->api  = $api;
        $this->clip = $clip;
        $this->pdf  = $pdf;
        $this->file = $file;
        $this->hpdf = $hpdf;
    }

    /**
     * Get All Annotations
     *
     * @param $data
     *
     * @return array
     */
    public function getAllAnnotations($data)
    {
        $resource    = 'annotation/';
        $annotations = [];
        foreach ($data as $id) {
            if (!empty($id)) {
                $annotation = $this->api->apiCall($resource . $id);
                if (!empty($annotation)) {
                    $annotations[] = $annotation;
                }
            }
        }

        return $annotations;
    }

    /**
     * Format annotations
     *
     * @param $annotationsId
     *
     * @return string
     */
    public function formatAnnotations($annotationsId)
    {
        $data        = [];
        $annotations = $this->getAllAnnotations($annotationsId);
        $i           = 0;
        foreach ($annotations as $annotation) {
            $detail   = $this->api->contractDetail($annotation->open_contracting_id);
            $metadata = $detail->metadata;
            $page     = $annotation->page[0];
            $pageUrl  = route(
                'contract.popup',
                [
                    'contract_id'   => $annotation->open_contracting_id,
                    'annotation_id' => $page->id,
                ]
            );

            if (!empty($metadata)) {
                $data[] = [
                    'name'                => $metadata->name,
                    'contract_id'         => $metadata->id,
                    'open_contracting_id' => $metadata->open_contracting_id,
                    'country'             => $metadata->country->name,
                    'country_code'        => $metadata->country->code,
                    'year'                => $metadata->year_signed,
                    'annotation_id'       => $annotation->annotation_id,
                    'page_url'            => $pageUrl,
                    'resource'            => $metadata->resource,
                    'resourcetemp'        => $metadata->resource[0],
                    'category'            => $annotation->category,
                    'text'                => $annotation->text,
                    'pages'               => $annotation->page,
                    'article_reference'   => $annotation->article_reference,
                    'action'              => 'x',
                ];
            }
            $i ++;
        }

        return json_encode(['result' => $data]);
    }

    /**
     * Download Annotations
     *
     * @param $data
     *
     * @return string
     */
    public function downloadAnnotations($data)
    {
        $annotations = $this->getAllAnnotations($data);

        $annotation[] = ["Document", "Country", "Year", "Annotation Category", "Text", "Link"];
        foreach ($annotations as $annot) {
            $annotationUrl = route('contract.detail', ['id' => $annot->open_contracting_id]);
            $pageUrl       = "";
            foreach ($annot->page as $page) {
                $pageUrl .= $annotationUrl . "#/" . $page->type . "/page/" . $page->page . "/annotation/" . $page->id . " | ";
            }
            $detail   = $this->api->contractDetail($annot->open_contracting_id);
            $metadata = $detail->metadata;
            if (!empty($metadata)) {
                $annotation[] = [
                    '"' . $metadata->name . '"',
                    '"' . $metadata->country->name . '"',
                    '"' . $metadata->year_signed . '"',
                    '"' . $annot->category . '"',
                    '"' . $annot->text . '"',
                    $pageUrl,
                ];
            }

        }

        return json_encode($annotation);
    }

    /**
     * Generate Unique key
     *
     * @return string
     */
    public function generateKey()
    {
        $key = md5(microtime() . rand());

        return $key;
    }

    /**
     * Save Clippings
     *
     * @param $data
     * @param $key
     *
     * @return array
     */
    public function saveClip($data, $key)
    {
        if (!empty($key)) {

            return $this->updateClip($key, $data);
        }
        $key = $this->generateKey();

        return $this->createClip($key, $data);
    }

    /**
     * Update Clip
     *
     * @param $key
     * @param $data
     *
     * @return array
     */
    public function updateClip($key, $data)
    {
        $response = [
            'text' => 'Not Updated.',
        ];

        if ($this->clip->where('key', $key)->update(['annotations' => json_encode($data)])) {
            $response = [
                'text' => 'Successfully updated.',
                'key'  => $key,
            ];
        }

        return $response;
    }

    /**
     * Create Clip
     *
     * @param $key
     * @param $data
     *
     * @return array
     */
    public function createClip($key, $data)
    {
        $input    = [
            'key'         => $key,
            'annotations' => $data,
        ];
        $response = [
            'text' => "Not Saved",
            'key'  => '',
        ];
        if ($this->clip->create($input)) {
            $response = [
                'text' => 'Clip saved Successfully.',
                'key'  => $key,
            ];
        }

        return $response;
    }

    /**
     * Get Clipped Annotations
     *
     * @param $key
     *
     * @return string
     */
    public function getClippedAnnotations($key)
    {
        $data        = $this->clip->where('key', $key)->get();
        $data        = $data->toArray();
        $annotations = $data[0]['annotations'];

        $clipAnnotations = $this->formatAnnotations($annotations);

        return $clipAnnotations;

    }

    /**
     * Send Email
     *
     * @param $formData
     *
     * @return bool
     */
    public function sendMail($formData)
    {
        $formData['site'] = meta()->title;
        $to               = explode(',', $formData['to']);
        try {
            Mail::send(
                'clip.email',
                $formData,
                function ($msg) use ($formData, $to) {
                    $msg->subject($formData['subject']);
                    $msg->to($to);
                    $msg->from([$formData['from']]);
                }
            );

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * Get Zip file
     *
     * @param $data
     *
     * @return bool|string
     */
    public function getZipFile($data)
    {
        $data             = explode(',', $data);
        $annotations      = $this->getAllAnnotations($data);
        $annotationDetail = $this->formatAnnotations($data);
        $pdfs             = $this->getPdfUrl($annotations);
        $basePath         = __DIR__ . '/../../../public';
        $folder           = time();
        $concatFileName   = 'concat-' . time() . '.pdf';
        $zipFileName      = 'pdf-' . time() . '.zip';

        try {
            $this->downloadFile($basePath, $folder, $pdfs);

            $this->concatPDF($annotationDetail, $basePath, $folder, $concatFileName);
            $this->zipFolder($basePath, $folder, $concatFileName, $zipFileName);

            return $this->upLoadZipFile($basePath, $folder, $zipFileName);

        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * Get pdf url
     *
     * @param $annotations
     *
     * @return array
     */
    public function getPdfUrl($annotations)
    {
        $pdf = [];
        foreach ($annotations as $annotation) {
            $page   = $annotation->page[0]->page;
            $text   = $this->api->getTextPage($annotation->open_contracting_id, $page);
            $pdfUrl = $text->result[0]->pdf_url;

            array_push($pdf, $pdfUrl);
        }

        return array_unique($pdf);
    }

    /**
     * Get Download File
     *
     * @param $basePath
     * @param $folder
     * @param $pdfs
     *
     * @return bool
     */
    public function downloadFile($basePath, $folder, $pdfs)
    {
        if (!is_dir($basePath . '/' . $folder)) {
            mkdir($basePath . '/' . $folder, 0777, true);
        }

        foreach ($pdfs as $pdf) {
            $fileName = explode('/', $pdf);
            $fileName = $fileName[3] . '-' . $fileName[4];
            file_put_contents($basePath . '/' . $folder . '/' . $fileName, file_get_contents($pdf));
        }

        return true;
    }

    /**
     * Merge Pdfs
     *
     * @param $basePath
     * @param $folder
     * @param $concatFileName
     *
     * @return bool
     * @throws \LynX39\LaraPdfMerger\Exception
     */
    public function concatPDF($annotationDetail, $basePath, $folder, $concatFileName)
    {
        $files = scandir($basePath . '/' . $folder);
        unset($files[0], $files[1]);

        foreach ($files as $file) {
            $this->pdf->addPDF($basePath . '/' . $folder . '/' . $file);
        }

        $this->pdf->merge('file', $basePath . '/' . $folder . '/' . $concatFileName);
        $this->makePdfOfAllAnnotation($annotationDetail, $basePath, $folder);

        return true;
    }

    /**
     * Zip folder
     *
     * @param $basePath
     * @param $folder
     * @param $concatFileName
     * @param $zipFileName
     *
     * @return bool
     */
    private function zipFolder($basePath, $folder, $concatFileName, $zipFileName)
    {
        $zip = new ZipArchive();
        $zip->open($basePath . '/' . $folder . '/' . $zipFileName, ZipArchive::CREATE);
        $zip->addFile($basePath . '/' . $folder . '/' . $concatFileName, $concatFileName);
        $zip->addFile($basePath . '/' . $folder . '/' . "clippedannotations.pdf", "clippedannotations.pdf");
        $zip->close();

        return true;
    }

    /**
     * Upload Zip file
     *
     * @param $basePath
     * @param $folder
     * @param $zipFileName
     *
     * @return string
     */
    private function upLoadZipFile($basePath, $folder, $zipFileName)
    {
        $this->file->disk('s3')->put(
            '/downzip/' . $zipFileName,
            file_get_contents($basePath . '/' . $folder . '/' . $zipFileName)
        );
        $file = 'http://s3-us-west-2.amazonaws.com/' . env('AWS_BUCKET') . '/downzip/' . $zipFileName;
        $this->rrmdir($basePath . '/' . $folder);

        return $file;
    }

    /**
     * Remove directory
     *
     * @param $dir
     */
    public function rrmdir($dir)
    {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (is_dir($dir . "/" . $object)) {
                        rrmdir($dir . "/" . $object);
                    } else {
                        unlink($dir . "/" . $object);
                    }
                }
            }
            rmdir($dir);
        }
    }

    /**
     * Make pdf file of all annotations
     * @param $annotations
     * @param $basePath
     * @param $folder
     * @return bool
     * @throws Exception
     * @throws \Throwable
     */
    public function makePdfOfAllAnnotation($annotations, $basePath, $folder)
    {
        $annotations = json_decode($annotations);
        $html        = view('clip.pdfs', compact('annotations'))->render();
        $this->hpdf->load($html)->filename($basePath . '/' . $folder . '/clippedannotations.pdf')->output();

        return true;

    }
}
