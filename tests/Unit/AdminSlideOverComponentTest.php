<?php

test('admin slide-over content area is scrollable', function () {
    $contents = file_get_contents(
        dirname(__DIR__, 2).'/resources/js/components/admin/admin-slide-over.tsx'
    );

    expect($contents)->toContain('overflow-y-auto');
});
