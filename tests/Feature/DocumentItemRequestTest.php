<?php

use App\Http\Requests\Admin\StoreDocumentItemRequest;
use App\Http\Requests\Admin\UpdateDocumentItemRequest;
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
        ->and($rules['issued_at'])->toContain('required')
        ->and($rules['published_at'])->toContain('required');

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
        ->and($rules['issued_at'])->toContain('required')
        ->and($rules['published_at'])->toContain('required');
});
