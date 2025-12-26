<?php

namespace App\Http\Requests\Admin;

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'type' => ['required', Rule::enum(DocumentType::class)],
            'status' => ['required', Rule::enum(DocumentStatus::class)],
            'file' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
            'issued_at' => ['required', 'date'],
            'published_at' => ['required', 'date'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul dokumen wajib diisi.',
            'title.max' => 'Judul dokumen maksimal 255 karakter.',
            'description.required' => 'Deskripsi dokumen wajib diisi.',
            'type.required' => 'Tipe dokumen wajib dipilih.',
            'type.enum' => 'Tipe dokumen tidak valid.',
            'status.required' => 'Status dokumen wajib dipilih.',
            'status.enum' => 'Status dokumen tidak valid.',
            'file.file' => 'File dokumen tidak valid.',
            'file.mimes' => 'File dokumen harus berformat PDF.',
            'file.max' => 'Ukuran file maksimal 10 MB.',
            'issued_at.required' => 'Tanggal terbit wajib diisi.',
            'issued_at.date' => 'Tanggal terbit tidak valid.',
            'published_at.required' => 'Tanggal publikasi wajib diisi.',
            'published_at.date' => 'Tanggal publikasi tidak valid.',
        ];
    }
}
