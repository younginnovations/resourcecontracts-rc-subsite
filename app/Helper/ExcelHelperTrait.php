<?php


namespace App\Helper;


trait ExcelHelperTrait
{
    /**
     * @param \PHPExcel_Cell $cell
     * @param $url
     * @throws \PHPExcel_Exception
     */
    protected function setCellAsHyperlink(\PHPExcel_Cell $cell, $url)
    {
        $cell->getHyperlink()->setUrl($url);
        $cell->setValue($url);
        $cell->getStyle()->applyFromArray(
            [
                'font' => [
                    'color'     => [
                        'rgb' => '0000FF'
                    ],
                    'underline' => 'single'
                ]
            ]
        );
    }

    /**
     * @param \PHPExcel_Worksheet $sheet
     * @param array $headings
     * @param int $row
     * @throws \PHPExcel_Exception
     */
    protected function fillHeaders(\PHPExcel_Worksheet $sheet, array $headings, $row = 1)
    {
        $col = 'A';
        foreach ($headings as $heading) {
            $sheet->setCellValue($col.$row, $heading);
            $sheet->getCell($col . $row)->getStyle()->getFont()->setBold(true);
            $col++;
        }
    }

    /**
     * @param \PHPExcel_Worksheet $sheet
     * @param $row
     * @param array $properties
     * @throws \PHPExcel_Exception
     */
    protected function fillRow(\PHPExcel_Worksheet $sheet, $row , array $properties)
    {
        $col = 'A';
        foreach ($properties as $property) {
            $sheet->setCellValue($col . $row, $property['text']);
            if (isset($property['format']) && !empty($property['format'])) {
                $this->formatCell($sheet->getCell($col . $row), $property['format']);
            }
            $col++;
        }
    }

    /**
     * @param \PHPExcel_Cell $cell
     * @param $formats
     * @throws \PHPExcel_Exception
     */
    protected function formatCell(\PHPExcel_Cell $cell, $formats)
    {
        if (isset($formats['hyperlink'])) {
            $this->setCellAsHyperlink($cell, $formats['hyperlink']['url']);
        }
        if (isset($formats['italic'])) {
            $cell->getStyle()->getFont()->setItalic($formats['italic']);
        }
    }
}