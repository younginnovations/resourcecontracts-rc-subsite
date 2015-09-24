<?php namespace App\Http\Services;

/**
 * Class DownloadService
 * @package App\Http\Services
 */
class DownloadService
{
    /**
     * @var APIService
     */
    private $api;

    /**
     * @param APIService $api
     */
    public function __construct(APIService $api)
    {

        $this->api = $api;
    }

    /**
     * Make the csv file for download
     * @param $get
     */
    public function downloadSearchResult($ids)
    {
        $contracts = $this->api->getAllMetadata($ids);
        $data      = $this->formatCSVData($contracts);
        $filename  = "export" . date('Y-m-d');
        header('Content-type: text/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '.csv"');
        $file = fopen('php://output', 'w');
        fputcsv(
            $file,
            [
                'Contract Name',
                'Contract Identifier ',
                'Language',
                'Country Name',
                'Resource',
                'Contract Type',
                'Signature Date',
                'Document Type',
                'Project Title',
                'Project Identifier',
                'Source Url',
                'Disclosure Mode',
                'Retrieval Date',
                'Signature Year',
                'Government Entity',
                'Government Identifier',
                'Company Name',
                'Company Address',
                'Jurisdiction of Incorporation',
                'Registration Agency',
                'Company Number',
                'Corporate Grouping',
                'Participation Share',
                'Open Corporates Link',
                'Incorporation Date',
                'Operator',
                'License Name',
                'License Identifier'

            ]
        );

        foreach ($data as $row) {
            fputcsv($file, $row);
        }
        fclose($file);
        die();
    }

    /**
     * Format all the metadata
     * @param $contracts
     * @return array
     */
    private function formatCSVData($contracts)
    {
        $data = [];
        foreach ($contracts as $contract) {
            $data[] = [

                $contract->contract_name,
                $contract->contract_identifier,
                $contract->language,
                $contract->country->name,
                implode(';', $contract->resource),
                $contract->type_of_contract,
                $contract->signature_date,
                $contract->document_type,
                $contract->project_title,
                $contract->project_identifier,
                $contract->source_url,
                $contract->disclosure_mode,
                $contract->date_retrieval,
                $contract->signature_year,
                implode(';', $this->makeSemicolonSeparated($contract->government_entity, 'entity')),
                implode(';', $this->makeSemicolonSeparated($contract->government_entity, 'identifier')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'name')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'company_address')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'jurisdiction_of_incorporation')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'registration_agency')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'company_number')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'parent_company')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'participation_share')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'open_corporate_id')),
                implode(';', $this->makeSemicolonSeparated($contract->company, 'company_founding_date')),
                implode(';', $this->getOperator($contract->company, 'operator')),
                implode(';', $this->makeSemicolonSeparated($contract->concession, 'license_name')),
                implode(';', $this->makeSemicolonSeparated($contract->concession, 'license_identifier')),
            ];
        }

        return $data;
    }

    /**
     * Make the array semicolon separated for multiple data
     * @param $arrays
     * @param $key
     * @return array
     */
    private function makeSemicolonSeparated($arrays, $key)
    {
        $data = [];
        if ($arrays = null) {
            return $data;
        }

        foreach ($arrays as $array) {

            if (is_array($array) && array_key_exists($array, $key)) {
                array_push($data, $array[$key]);
            }
            if (is_object($array) && property_exists($array, $key)) {
                array_push($data, $array->$key);
            }
        }


        return $data;
    }

    /**
     * Return the operator
     * @param $company
     * @return array
     */
    private function getOperator($company)
    {
        $data     = [];
        $operator = trans('codelist/operator');
        foreach ($company as $companyData) {
            if (isset($companyData->operator) && $companyData->operator) {
                array_push($data, $operator[$companyData->operator]);
            }

        }

        return $data;
    }


}
