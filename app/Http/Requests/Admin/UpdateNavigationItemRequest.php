<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNavigationItemRequest extends FormRequest
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
            'parent_id' => ['nullable', 'integer', 'exists:navigation_items,id'],
            'label' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('navigation_items', 'slug')->ignore($this->route('navigationItem')),
            ],
            'url' => [
                Rule::when(
                    $this->boolean('is_external'),
                    ['required', 'url'],
                    ['nullable'],
                ),
                'string',
                'max:2048',
            ],
            'is_external' => ['required', 'boolean'],
            'is_visible' => ['required', 'boolean'],
            'sort_order' => ['required', 'integer', 'min:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'label.required' => 'Label menu wajib diisi.',
            'slug.unique' => 'Slug sudah digunakan.',
            'url.url' => 'URL harus valid.',
            'is_external.required' => 'Tipe link wajib diisi.',
            'is_visible.required' => 'Status tampil wajib diisi.',
            'sort_order.required' => 'Urutan menu wajib diisi.',
        ];
    }
}
