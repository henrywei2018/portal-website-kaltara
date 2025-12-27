<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceCatalogItemRequest extends FormRequest
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
            'service_sector_id' => ['required', 'exists:service_sectors,id'],
            'title' => ['required', 'string', 'max:255'],
            'media_information' => ['required', 'string'],
            'community_benefits' => ['required', 'string'],
            'sidatuk_features' => ['required', 'string'],
            'service_terms' => ['required', 'string'],
            'service_flow' => ['required', 'string'],
            'is_active' => ['required', 'boolean'],
            'infographic' => ['nullable', 'file', 'mimes:png,jpg,jpeg,svg', 'max:5120'],
            'faqs' => ['nullable', 'array'],
            'faqs.*.question' => ['required_with:faqs', 'string', 'max:255'],
            'faqs.*.answer' => ['required_with:faqs', 'string'],
            'faqs.*.sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'service_sector_id.required' => 'Sektor layanan wajib dipilih.',
            'service_sector_id.exists' => 'Sektor layanan tidak ditemukan.',
            'title.required' => 'Judul layanan wajib diisi.',
            'title.max' => 'Judul layanan maksimal 255 karakter.',
            'media_information.required' => 'Media dan informasi wajib diisi.',
            'community_benefits.required' => 'Manfaat bagi masyarakat wajib diisi.',
            'sidatuk_features.required' => 'Fitur SIDATUK wajib diisi.',
            'service_terms.required' => 'Ketentuan layanan wajib diisi.',
            'service_flow.required' => 'Alur layanan wajib diisi.',
            'is_active.required' => 'Status tampil wajib diisi.',
            'is_active.boolean' => 'Status tampil tidak valid.',
            'infographic.file' => 'File infografis tidak valid.',
            'infographic.mimes' => 'Infografis harus berformat PNG, JPG, JPEG, atau SVG.',
            'infographic.max' => 'Ukuran infografis maksimal 5 MB.',
            'faqs.*.question.required_with' => 'Pertanyaan FAQ wajib diisi.',
            'faqs.*.answer.required_with' => 'Jawaban FAQ wajib diisi.',
            'faqs.*.sort_order.integer' => 'Urutan FAQ harus berupa angka.',
        ];
    }
}
