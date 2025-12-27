import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::index
* @see app/Http/Controllers/Admin/ServiceSectorController.php:17
* @route '/admin/service-sectors'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/service-sectors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::index
* @see app/Http/Controllers/Admin/ServiceSectorController.php:17
* @route '/admin/service-sectors'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::index
* @see app/Http/Controllers/Admin/ServiceSectorController.php:17
* @route '/admin/service-sectors'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::index
* @see app/Http/Controllers/Admin/ServiceSectorController.php:17
* @route '/admin/service-sectors'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::index
* @see app/Http/Controllers/Admin/ServiceSectorController.php:17
* @route '/admin/service-sectors'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::index
* @see app/Http/Controllers/Admin/ServiceSectorController.php:17
* @route '/admin/service-sectors'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::index
* @see app/Http/Controllers/Admin/ServiceSectorController.php:17
* @route '/admin/service-sectors'
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
* @see \App\Http\Controllers\Admin\ServiceSectorController::store
* @see app/Http/Controllers/Admin/ServiceSectorController.php:45
* @route '/admin/service-sectors'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/service-sectors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::store
* @see app/Http/Controllers/Admin/ServiceSectorController.php:45
* @route '/admin/service-sectors'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::store
* @see app/Http/Controllers/Admin/ServiceSectorController.php:45
* @route '/admin/service-sectors'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::store
* @see app/Http/Controllers/Admin/ServiceSectorController.php:45
* @route '/admin/service-sectors'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::store
* @see app/Http/Controllers/Admin/ServiceSectorController.php:45
* @route '/admin/service-sectors'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::update
* @see app/Http/Controllers/Admin/ServiceSectorController.php:61
* @route '/admin/service-sectors/{serviceSector}'
*/
export const update = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/service-sectors/{serviceSector}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::update
* @see app/Http/Controllers/Admin/ServiceSectorController.php:61
* @route '/admin/service-sectors/{serviceSector}'
*/
update.url = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { serviceSector: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { serviceSector: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            serviceSector: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        serviceSector: typeof args.serviceSector === 'object'
        ? args.serviceSector.id
        : args.serviceSector,
    }

    return update.definition.url
            .replace('{serviceSector}', parsedArgs.serviceSector.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::update
* @see app/Http/Controllers/Admin/ServiceSectorController.php:61
* @route '/admin/service-sectors/{serviceSector}'
*/
update.patch = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::update
* @see app/Http/Controllers/Admin/ServiceSectorController.php:61
* @route '/admin/service-sectors/{serviceSector}'
*/
const updateForm = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::update
* @see app/Http/Controllers/Admin/ServiceSectorController.php:61
* @route '/admin/service-sectors/{serviceSector}'
*/
updateForm.patch = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ServiceSectorController::destroy
* @see app/Http/Controllers/Admin/ServiceSectorController.php:78
* @route '/admin/service-sectors/{serviceSector}'
*/
export const destroy = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/service-sectors/{serviceSector}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::destroy
* @see app/Http/Controllers/Admin/ServiceSectorController.php:78
* @route '/admin/service-sectors/{serviceSector}'
*/
destroy.url = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { serviceSector: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { serviceSector: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            serviceSector: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        serviceSector: typeof args.serviceSector === 'object'
        ? args.serviceSector.id
        : args.serviceSector,
    }

    return destroy.definition.url
            .replace('{serviceSector}', parsedArgs.serviceSector.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::destroy
* @see app/Http/Controllers/Admin/ServiceSectorController.php:78
* @route '/admin/service-sectors/{serviceSector}'
*/
destroy.delete = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::destroy
* @see app/Http/Controllers/Admin/ServiceSectorController.php:78
* @route '/admin/service-sectors/{serviceSector}'
*/
const destroyForm = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceSectorController::destroy
* @see app/Http/Controllers/Admin/ServiceSectorController.php:78
* @route '/admin/service-sectors/{serviceSector}'
*/
destroyForm.delete = (args: { serviceSector: string | number | { id: string | number } } | [serviceSector: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ServiceSectorController = { index, store, update, destroy }

export default ServiceSectorController