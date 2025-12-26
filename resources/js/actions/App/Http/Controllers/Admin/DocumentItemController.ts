import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DocumentItemController::index
* @see app/Http/Controllers/Admin/DocumentItemController.php:19
* @route '/admin/documents'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::index
* @see app/Http/Controllers/Admin/DocumentItemController.php:19
* @route '/admin/documents'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::index
* @see app/Http/Controllers/Admin/DocumentItemController.php:19
* @route '/admin/documents'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::index
* @see app/Http/Controllers/Admin/DocumentItemController.php:19
* @route '/admin/documents'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::index
* @see app/Http/Controllers/Admin/DocumentItemController.php:19
* @route '/admin/documents'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::index
* @see app/Http/Controllers/Admin/DocumentItemController.php:19
* @route '/admin/documents'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::index
* @see app/Http/Controllers/Admin/DocumentItemController.php:19
* @route '/admin/documents'
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
* @see \App\Http\Controllers\Admin\DocumentItemController::store
* @see app/Http/Controllers/Admin/DocumentItemController.php:60
* @route '/admin/documents'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::store
* @see app/Http/Controllers/Admin/DocumentItemController.php:60
* @route '/admin/documents'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::store
* @see app/Http/Controllers/Admin/DocumentItemController.php:60
* @route '/admin/documents'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::store
* @see app/Http/Controllers/Admin/DocumentItemController.php:60
* @route '/admin/documents'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::store
* @see app/Http/Controllers/Admin/DocumentItemController.php:60
* @route '/admin/documents'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::update
* @see app/Http/Controllers/Admin/DocumentItemController.php:76
* @route '/admin/documents/{documentItem}'
*/
export const update = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/documents/{documentItem}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::update
* @see app/Http/Controllers/Admin/DocumentItemController.php:76
* @route '/admin/documents/{documentItem}'
*/
update.url = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { documentItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            documentItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        documentItem: typeof args.documentItem === 'object'
        ? args.documentItem.id
        : args.documentItem,
    }

    return update.definition.url
            .replace('{documentItem}', parsedArgs.documentItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::update
* @see app/Http/Controllers/Admin/DocumentItemController.php:76
* @route '/admin/documents/{documentItem}'
*/
update.patch = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::update
* @see app/Http/Controllers/Admin/DocumentItemController.php:76
* @route '/admin/documents/{documentItem}'
*/
const updateForm = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::update
* @see app/Http/Controllers/Admin/DocumentItemController.php:76
* @route '/admin/documents/{documentItem}'
*/
updateForm.patch = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\DocumentItemController::destroy
* @see app/Http/Controllers/Admin/DocumentItemController.php:93
* @route '/admin/documents/{documentItem}'
*/
export const destroy = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/documents/{documentItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::destroy
* @see app/Http/Controllers/Admin/DocumentItemController.php:93
* @route '/admin/documents/{documentItem}'
*/
destroy.url = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { documentItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            documentItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        documentItem: typeof args.documentItem === 'object'
        ? args.documentItem.id
        : args.documentItem,
    }

    return destroy.definition.url
            .replace('{documentItem}', parsedArgs.documentItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::destroy
* @see app/Http/Controllers/Admin/DocumentItemController.php:93
* @route '/admin/documents/{documentItem}'
*/
destroy.delete = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::destroy
* @see app/Http/Controllers/Admin/DocumentItemController.php:93
* @route '/admin/documents/{documentItem}'
*/
const destroyForm = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DocumentItemController::destroy
* @see app/Http/Controllers/Admin/DocumentItemController.php:93
* @route '/admin/documents/{documentItem}'
*/
destroyForm.delete = (args: { documentItem: number | { id: number } } | [documentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const DocumentItemController = { index, store, update, destroy }

export default DocumentItemController