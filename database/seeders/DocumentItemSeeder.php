<?php

namespace Database\Seeders;

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use App\Models\DocumentItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $documents = [
            [
                'title' => 'Pengumuman Resmi Portal Kaltara',
                'description' => 'Pengumuman pembaruan portal layanan dan informasi publik.',
                'type' => DocumentType::Announcement,
            ],
            [
                'title' => 'Pengumuman Jadwal Pelayanan',
                'description' => 'Jadwal pelayanan publik dan pemeliharaan sistem.',
                'type' => DocumentType::Announcement,
            ],
            [
                'title' => 'Laporan IPKD Semester 1',
                'description' => 'Publikasi IPKD Semester 1 Tahun Berjalan.',
                'type' => DocumentType::Ipkd,
            ],
            [
                'title' => 'Laporan IPKD Semester 2',
                'description' => 'Publikasi IPKD Semester 2 Tahun Berjalan.',
                'type' => DocumentType::Ipkd,
            ],
        ];

        foreach ($documents as $index => $document) {
            $slug = Str::slug($document['title']);
            $fileName = "{$slug}.pdf";
            $filePath = "documents/{$fileName}";

            if (! Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->put(
                    $filePath,
                    $this->generatePdf("Dokumen {$document['title']}")
                );
            }

            $fullPath = Storage::disk('public')->path($filePath);
            $fileSize = is_file($fullPath) ? filesize($fullPath) : null;

            DocumentItem::query()->updateOrCreate(
                ['title' => $document['title']],
                [
                    'title' => $document['title'],
                    'description' => $document['description'],
                    'type' => $document['type'],
                    'status' => DocumentStatus::Published,
                    'file_path' => $filePath,
                    'file_name' => $fileName,
                    'file_size' => $fileSize ?? 0,
                    'file_disk' => 'public',
                    'issued_at' => now()->subDays($index + 3)->toDateString(),
                    'published_at' => now()->subDays($index + 2)->toDateString(),
                ]
            );
        }
    }

    protected function generatePdf(string $title): string
    {
        $stream = "BT /F1 12 Tf 50 150 Td ({$title}) Tj ET";
        $streamLength = strlen($stream);

        $pdf = "%PDF-1.4\n";
        $offsets = [];

        $offsets[1] = strlen($pdf);
        $pdf .= "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";

        $offsets[2] = strlen($pdf);
        $pdf .= "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";

        $offsets[3] = strlen($pdf);
        $pdf .= "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n";

        $offsets[4] = strlen($pdf);
        $pdf .= "4 0 obj\n<< /Length {$streamLength} >>\nstream\n{$stream}\nendstream\nendobj\n";

        $offsets[5] = strlen($pdf);
        $pdf .= "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";

        $xrefOffset = strlen($pdf);
        $pdf .= "xref\n0 6\n";
        $pdf .= "0000000000 65535 f \n";

        for ($i = 1; $i <= 5; $i++) {
            $pdf .= sprintf("%010d 00000 n \n", $offsets[$i]);
        }

        $pdf .= "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n{$xrefOffset}\n%%EOF\n";

        return $pdf;
    }
}
