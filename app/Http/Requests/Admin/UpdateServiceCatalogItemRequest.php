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
            'provider_name' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:500'],
            'service_logo' => ['nullable', 'file', 'mimes:png,jpg,jpeg,svg', 'max:5120'],
            'service_status' => ['nullable', 'string', 'in:online,offline,limited'],
            'service_cta_label' => ['nullable', 'string', 'max:80'],
            'service_cta_url' => ['nullable', 'url', 'max:255'],
            'hotline_phone' => ['nullable', 'string', 'max:50'],
            'service_website_url' => ['nullable', 'url', 'max:255'],
            'service_address' => ['nullable', 'string', 'max:500'],
            'service_phone' => ['nullable', 'string', 'max:50'],
            'service_email' => ['nullable', 'email', 'max:255'],
            'operational_hours' => ['nullable', 'array'],
            'operational_hours.*.day' => ['required_with:operational_hours', 'string', 'max:20'],
            'operational_hours.*.opens_at' => ['nullable', 'date_format:H:i'],
            'operational_hours.*.closes_at' => ['nullable', 'date_format:H:i'],
            'operational_hours.*.is_closed' => ['nullable', 'boolean'],
            'social_links' => ['nullable', 'array'],
            'social_links.*.platform' => ['required_with:social_links', 'string', 'max:50'],
            'social_links.*.url' => ['required_with:social_links', 'url', 'max:255'],
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
            'service_logo.file' => 'Logo layanan tidak valid.',
            'service_logo.mimes' => 'Logo layanan harus berformat PNG, JPG, JPEG, atau SVG.',
            'service_logo.max' => 'Ukuran logo layanan maksimal 5 MB.',
            'service_status.in' => 'Status layanan tidak valid.',
            'faqs.*.question.required_with' => 'Pertanyaan FAQ wajib diisi.',
            'faqs.*.answer.required_with' => 'Jawaban FAQ wajib diisi.',
            'faqs.*.sort_order.integer' => 'Urutan FAQ harus berupa angka.',
        ];
    }
}
