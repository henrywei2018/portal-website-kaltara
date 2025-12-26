<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageRequest extends FormRequest
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
            'slug' => [
                'required',
                'string',
                'max:255',
                'alpha_dash',
                Rule::unique('pages', 'slug')->ignore($this->route('page')),
            ],
            'status' => ['required', 'string', Rule::in(['draft', 'published'])],
            'blocks' => ['nullable', 'array'],
            'blocks.*.type' => ['required', 'string', Rule::in(['heading', 'paragraph', 'list', 'quote'])],
            'blocks.*.content' => ['required', 'string'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul halaman wajib diisi.',
            'slug.required' => 'Slug halaman wajib diisi.',
            'slug.alpha_dash' => 'Slug hanya boleh berisi huruf, angka, dash, dan underscore.',
            'slug.unique' => 'Slug sudah digunakan.',
            'status.required' => 'Status halaman wajib dipilih.',
            'status.in' => 'Status halaman tidak valid.',
            'blocks.array' => 'Format blok halaman tidak valid.',
            'blocks.*.type.in' => 'Tipe blok tidak dikenali.',
            'blocks.*.content.required' => 'Konten blok wajib diisi.',
        ];
    }
}
