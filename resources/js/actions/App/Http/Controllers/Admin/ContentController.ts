import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ContentController::index
* @see app/Http/Controllers/Admin/ContentController.php:22
* @route '/admin/content'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/content',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::index
* @see app/Http/Controllers/Admin/ContentController.php:22
* @route '/admin/content'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::index
* @see app/Http/Controllers/Admin/ContentController.php:22
* @route '/admin/content'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::index
* @see app/Http/Controllers/Admin/ContentController.php:22
* @route '/admin/content'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::index
* @see app/Http/Controllers/Admin/ContentController.php:22
* @route '/admin/content'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::index
* @see app/Http/Controllers/Admin/ContentController.php:22
* @route '/admin/content'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::index
* @see app/Http/Controllers/Admin/ContentController.php:22
* @route '/admin/content'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Admin\ContentController::store
* @see app/Http/Controllers/Admin/ContentController.php:85
* @route '/admin/content'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/content',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::store
* @see app/Http/Controllers/Admin/ContentController.php:85
* @route '/admin/content'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::store
* @see app/Http/Controllers/Admin/ContentController.php:85
* @route '/admin/content'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::store
* @see app/Http/Controllers/Admin/ContentController.php:85
* @route '/admin/content'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::store
* @see app/Http/Controllers/Admin/ContentController.php:85
* @route '/admin/content'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ContentController::update
* @see app/Http/Controllers/Admin/ContentController.php:95
* @route '/admin/content/{contentItem}'
*/
export const update = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/content/{contentItem}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::update
* @see app/Http/Controllers/Admin/ContentController.php:95
* @route '/admin/content/{contentItem}'
*/
update.url = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contentItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contentItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contentItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contentItem: typeof args.contentItem === 'object'
        ? args.contentItem.id
        : args.contentItem,
    }

    return update.definition.url
            .replace('{contentItem}', parsedArgs.contentItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::update
* @see app/Http/Controllers/Admin/ContentController.php:95
* @route '/admin/content/{contentItem}'
*/
update.patch = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::update
* @see app/Http/Controllers/Admin/ContentController.php:95
* @route '/admin/content/{contentItem}'
*/
const updateForm = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::update
* @see app/Http/Controllers/Admin/ContentController.php:95
* @route '/admin/content/{contentItem}'
*/
updateForm.patch = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
* @see app/Http/Controllers/Admin/ContentController.php:105
* @route '/admin/content/{contentItem}'
*/
export const destroy = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/content/{contentItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
* @see app/Http/Controllers/Admin/ContentController.php:105
* @route '/admin/content/{contentItem}'
*/
destroy.url = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contentItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contentItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contentItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contentItem: typeof args.contentItem === 'object'
        ? args.contentItem.id
        : args.contentItem,
    }

    return destroy.definition.url
            .replace('{contentItem}', parsedArgs.contentItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
* @see app/Http/Controllers/Admin/ContentController.php:105
* @route '/admin/content/{contentItem}'
*/
destroy.delete = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
* @see app/Http/Controllers/Admin/ContentController.php:105
* @route '/admin/content/{contentItem}'
*/
const destroyForm = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
* @see app/Http/Controllers/Admin/ContentController.php:105
* @route '/admin/content/{contentItem}'
*/
destroyForm.delete = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ContentController = { index, store, update, destroy }

export default ContentController