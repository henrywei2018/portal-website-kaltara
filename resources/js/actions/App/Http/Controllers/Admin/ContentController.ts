import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Admin\ContentController::store
* @see app/Http/Controllers/Admin/ContentController.php:77
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
* @see app/Http/Controllers/Admin/ContentController.php:77
* @route '/admin/content'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ContentController::store
* @see app/Http/Controllers/Admin/ContentController.php:77
* @route '/admin/content'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::update
* @see app/Http/Controllers/Admin/ContentController.php:87
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
* @see app/Http/Controllers/Admin/ContentController.php:87
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
* @see app/Http/Controllers/Admin/ContentController.php:87
* @route '/admin/content/{contentItem}'
*/
update.patch = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ContentController::destroy
* @see app/Http/Controllers/Admin/ContentController.php:97
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
* @see app/Http/Controllers/Admin/ContentController.php:97
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
* @see app/Http/Controllers/Admin/ContentController.php:97
* @route '/admin/content/{contentItem}'
*/
destroy.delete = (args: { contentItem: number | { id: number } } | [contentItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

const ContentController = { index, store, update, destroy }

export default ContentController