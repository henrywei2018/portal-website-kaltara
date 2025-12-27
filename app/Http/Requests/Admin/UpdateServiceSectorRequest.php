<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceSectorRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'color' => ['nullable', 'string', 'max:20'],
            'sort_order' => ['required', 'integer', 'min:0'],
            'is_active' => ['required', 'boolean'],
            'icon' => ['nullable', 'file', 'mimes:png,jpg,jpeg,svg', 'max:5120'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama sektor wajib diisi.',
            'name.max' => 'Nama sektor maksimal 255 karakter.',
            'description.required' => 'Deskripsi sektor wajib diisi.',
            'sort_order.required' => 'Urutan tampil wajib diisi.',
            'sort_order.integer' => 'Urutan tampil harus berupa angka.',
            'sort_order.min' => 'Urutan tampil minimal 0.',
            'is_active.required' => 'Status tampil wajib diisi.',
            'is_active.boolean' => 'Status tampil tidak valid.',
            'icon.file' => 'File ikon tidak valid.',
            'icon.mimes' => 'Ikon harus berformat PNG, JPG, JPEG, atau SVG.',
            'icon.max' => 'Ukuran ikon maksimal 5 MB.',
        ];
    }
}
