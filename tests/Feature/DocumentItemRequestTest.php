<?php

use App\Enums\DocumentStatus;
use App\Enums\DocumentType;
use App\Http\Requests\Admin\StoreDocumentItemRequest;
use App\Http\Requests\Admin\UpdateDocumentItemRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

it('defines validation rules for storing document items', function () {
    $rules = (new StoreDocumentItemRequest)->rules();

    expect($rules)->toHaveKeys([
        'title',
        'description',
        'type',
        'status',
        'file',
        'issued_at',
        'published_at',
    ]);

    expect($rules['title'])->toContain('required')
        ->and($rules['description'])->toContain('required')
        ->and($rules['issued_at'])->toContain('required');

    expect($rules['file'])->toContain('required')
        ->and($rules['file'])->toContain('mimes:pdf')
        ->and($rules['file'])->toContain('max:10240');

    expect(collect($rules['type'])->contains(fn ($rule) => $rule instanceof Enum))->toBeTrue()
        ->and(collect($rules['status'])->contains(fn ($rule) => $rule instanceof Enum))->toBeTrue();
});

it('allows optional file on update while keeping required metadata', function () {
    $rules = (new UpdateDocumentItemRequest)->rules();

    expect($rules['file'])->toContain('nullable')
        ->and($rules['file'])->toContain('mimes:pdf')
        ->and($rules['file'])->toContain('max:10240');

    expect($rules['title'])->toContain('required')
        ->and($rules['description'])->toContain('required')
        ->and($rules['issued_at'])->toContain('required');
});

it('allows draft documents without a publication date', function () {
    $request = new StoreDocumentItemRequest;

    $validator = Validator::make(
        [
            'title' => 'Dokumen Draft',
            'description' => 'Deskripsi draft',
            'type' => DocumentType::Announcement->value,
            'status' => DocumentStatus::Draft->value,
            'file' => UploadedFile::fake()->create('draft.pdf', 100, 'application/pdf'),
            'issued_at' => '2024-10-01',
        ],
        $request->rules(),
        $request->messages(),
    );

    expect($validator->passes())->toBeTrue();
});

it('requires a publication date when status is published', function () {
    $request = new StoreDocumentItemRequest;

    $validator = Validator::make(
        [
            'title' => 'Dokumen Publik',
            'description' => 'Deskripsi publik',
            'type' => DocumentType::Announcement->value,
            'status' => DocumentStatus::Published->value,
            'file' => UploadedFile::fake()->create('publish.pdf', 100, 'application/pdf'),
            'issued_at' => '2024-10-01',
        ],
        $request->rules(),
        $request->messages(),
    );

    expect($validator->fails())->toBeTrue()
        ->and($validator->errors()->has('published_at'))->toBeTrue();
});
