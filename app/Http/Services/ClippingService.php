<?php namespace App\Http\Services;

class ClippingService
{
    /**
     * @var APIService
     */
    public $api;

    /**
     * @param APIService $api
     */
    public function __construct(APIService $api)
    {

        $this->api = $api;
    }

    public function getAllAnnotations($data)
    {
        $resource    = 'annotation/';
        $annotations = [];
        foreach ($data as $id) {
            if (!empty($id)) {
                $annotations[] = $this->api->apiCall($resource . $id);
            }
        }

        return $this->formatAnnotations($annotations);
    }

    private function formatAnnotations($annotations)
    {
        $data = [];
        foreach ($annotations as $annotation) {
            $data[] = "<tr>
                        <td>" . $annotation->open_contracting_id . "</td>
                        <td>" . $annotation->category . "</td>
                        <td>" . $annotation->text . " pg [" . $annotation->page . "]</td>
                        <td><button  annotation_id =" . $annotation->id . " class='remove-clip'>x</button></td>
                    </tr>";
        }

        return $data;
    }
}