import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\NavigationController::index
* @see app/Http/Controllers/Admin/NavigationController.php:19
* @route '/admin/navigation'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/navigation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\NavigationController::index
* @see app/Http/Controllers/Admin/NavigationController.php:19
* @route '/admin/navigation'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NavigationController::index
* @see app/Http/Controllers/Admin/NavigationController.php:19
* @route '/admin/navigation'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\NavigationController::index
* @see app/Http/Controllers/Admin/NavigationController.php:19
* @route '/admin/navigation'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\NavigationController::store
* @see app/Http/Controllers/Admin/NavigationController.php:86
* @route '/admin/navigation'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/navigation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\NavigationController::store
* @see app/Http/Controllers/Admin/NavigationController.php:86
* @route '/admin/navigation'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NavigationController::store
* @see app/Http/Controllers/Admin/NavigationController.php:86
* @route '/admin/navigation'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\NavigationController::update
* @see app/Http/Controllers/Admin/NavigationController.php:93
* @route '/admin/navigation/{navigationItem}'
*/
export const update = (args: { navigationItem: number | { id: number } } | [navigationItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/navigation/{navigationItem}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\NavigationController::update
* @see app/Http/Controllers/Admin/NavigationController.php:93
* @route '/admin/navigation/{navigationItem}'
*/
update.url = (args: { navigationItem: number | { id: number } } | [navigationItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { navigationItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { navigationItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            navigationItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        navigationItem: typeof args.navigationItem === 'object'
        ? args.navigationItem.id
        : args.navigationItem,
    }

    return update.definition.url
            .replace('{navigationItem}', parsedArgs.navigationItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NavigationController::update
* @see app/Http/Controllers/Admin/NavigationController.php:93
* @route '/admin/navigation/{navigationItem}'
*/
update.patch = (args: { navigationItem: number | { id: number } } | [navigationItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\NavigationController::destroy
* @see app/Http/Controllers/Admin/NavigationController.php:100
* @route '/admin/navigation/{navigationItem}'
*/
export const destroy = (args: { navigationItem: number | { id: number } } | [navigationItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/navigation/{navigationItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\NavigationController::destroy
* @see app/Http/Controllers/Admin/NavigationController.php:100
* @route '/admin/navigation/{navigationItem}'
*/
destroy.url = (args: { navigationItem: number | { id: number } } | [navigationItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { navigationItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { navigationItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            navigationItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        navigationItem: typeof args.navigationItem === 'object'
        ? args.navigationItem.id
        : args.navigationItem,
    }

    return destroy.definition.url
            .replace('{navigationItem}', parsedArgs.navigationItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\NavigationController::destroy
* @see app/Http/Controllers/Admin/NavigationController.php:100
* @route '/admin/navigation/{navigationItem}'
*/
destroy.delete = (args: { navigationItem: number | { id: number } } | [navigationItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const NavigationController = { index, store, update, destroy }

export default NavigationController