<?php

namespace App\Http\Requests\Admin;

use App\Enums\ContentStatus;
use App\Enums\ContentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContentItemRequest extends FormRequest
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
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', 'unique:content_items,slug'],
            'type' => ['required', Rule::enum(ContentType::class)],
            'status' => ['required', Rule::enum(ContentStatus::class)],
            'excerpt' => ['nullable', 'string'],
            'body' => ['nullable', 'string'],
            'published_at' => ['nullable', 'date'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul konten wajib diisi.',
            'slug.required' => 'Slug konten wajib diisi.',
            'slug.alpha_dash' => 'Slug hanya boleh berisi huruf, angka, dash, dan underscore.',
            'slug.unique' => 'Slug sudah digunakan.',
            'type.required' => 'Tipe konten wajib dipilih.',
            'type.enum' => 'Tipe konten tidak valid.',
            'status.required' => 'Status konten wajib dipilih.',
            'status.enum' => 'Status konten tidak valid.',
        ];
    }
}
