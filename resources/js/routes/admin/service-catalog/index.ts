import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::index
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:20
* @route '/admin/service-catalog'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/service-catalog',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::index
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:20
* @route '/admin/service-catalog'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::index
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:20
* @route '/admin/service-catalog'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::index
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:20
* @route '/admin/service-catalog'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::index
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:20
* @route '/admin/service-catalog'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::index
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:20
* @route '/admin/service-catalog'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::index
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:20
* @route '/admin/service-catalog'
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
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::store
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:97
* @route '/admin/service-catalog'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/service-catalog',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::store
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:97
* @route '/admin/service-catalog'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::store
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:97
* @route '/admin/service-catalog'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::store
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:97
* @route '/admin/service-catalog'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::store
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:97
* @route '/admin/service-catalog'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::update
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:123
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
export const update = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/service-catalog/{serviceCatalogItem}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::update
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:123
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
update.url = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { serviceCatalogItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { serviceCatalogItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            serviceCatalogItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        serviceCatalogItem: typeof args.serviceCatalogItem === 'object'
        ? args.serviceCatalogItem.id
        : args.serviceCatalogItem,
    }

    return update.definition.url
            .replace('{serviceCatalogItem}', parsedArgs.serviceCatalogItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::update
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:123
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
update.patch = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::update
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:123
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
const updateForm = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::update
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:123
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
updateForm.patch = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::destroy
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:157
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
export const destroy = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/service-catalog/{serviceCatalogItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::destroy
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:157
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
destroy.url = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { serviceCatalogItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { serviceCatalogItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            serviceCatalogItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        serviceCatalogItem: typeof args.serviceCatalogItem === 'object'
        ? args.serviceCatalogItem.id
        : args.serviceCatalogItem,
    }

    return destroy.definition.url
            .replace('{serviceCatalogItem}', parsedArgs.serviceCatalogItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::destroy
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:157
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
destroy.delete = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::destroy
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:157
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
const destroyForm = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ServiceCatalogItemController::destroy
* @see app/Http/Controllers/Admin/ServiceCatalogItemController.php:157
* @route '/admin/service-catalog/{serviceCatalogItem}'
*/
destroyForm.delete = (args: { serviceCatalogItem: number | { id: number } } | [serviceCatalogItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const serviceCatalog = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default serviceCatalog