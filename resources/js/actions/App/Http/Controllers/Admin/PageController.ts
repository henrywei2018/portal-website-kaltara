import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PageController::index
* @see app/Http/Controllers/Admin/PageController.php:15
* @route '/admin/pages'
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
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:34
* @route '/admin/pages'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/pages',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:34
* @route '/admin/pages'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:34
* @route '/admin/pages'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:34
* @route '/admin/pages'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PageController::store
* @see app/Http/Controllers/Admin/PageController.php:34
* @route '/admin/pages'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:44
* @route '/admin/pages/{page}'
*/
export const update = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/pages/{page}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:44
* @route '/admin/pages/{page}'
*/
update.url = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { page: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            page: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        page: typeof args.page === 'object'
        ? args.page.id
        : args.page,
    }

    return update.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:44
* @route '/admin/pages/{page}'
*/
update.patch = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:44
* @route '/admin/pages/{page}'
*/
const updateForm = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PageController::update
* @see app/Http/Controllers/Admin/PageController.php:44
* @route '/admin/pages/{page}'
*/
updateForm.patch = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:54
* @route '/admin/pages/{page}'
*/
export const destroy = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pages/{page}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:54
* @route '/admin/pages/{page}'
*/
destroy.url = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { page: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            page: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        page: typeof args.page === 'object'
        ? args.page.id
        : args.page,
    }

    return destroy.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:54
* @route '/admin/pages/{page}'
*/
destroy.delete = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:54
* @route '/admin/pages/{page}'
*/
const destroyForm = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PageController::destroy
* @see app/Http/Controllers/Admin/PageController.php:54
* @route '/admin/pages/{page}'
*/
destroyForm.delete = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const PageController = { index, store, update, destroy }

export default PageController