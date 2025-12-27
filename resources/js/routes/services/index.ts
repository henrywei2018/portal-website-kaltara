import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::index
* @see app/Http/Controllers/Public/ServiceCatalogController.php:17
* @route '/layanan'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/layanan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::index
* @see app/Http/Controllers/Public/ServiceCatalogController.php:17
* @route '/layanan'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::index
* @see app/Http/Controllers/Public/ServiceCatalogController.php:17
* @route '/layanan'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::index
* @see app/Http/Controllers/Public/ServiceCatalogController.php:17
* @route '/layanan'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::index
* @see app/Http/Controllers/Public/ServiceCatalogController.php:17
* @route '/layanan'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::index
* @see app/Http/Controllers/Public/ServiceCatalogController.php:17
* @route '/layanan'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::index
* @see app/Http/Controllers/Public/ServiceCatalogController.php:17
* @route '/layanan'
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
* @see \App\Http\Controllers\Public\ServiceCatalogController::show
* @see app/Http/Controllers/Public/ServiceCatalogController.php:88
* @route '/layanan/{serviceCatalogItem}'
*/
export const show = (args: { serviceCatalogItem: string | { slug: string } } | [serviceCatalogItem: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/layanan/{serviceCatalogItem}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::show
* @see app/Http/Controllers/Public/ServiceCatalogController.php:88
* @route '/layanan/{serviceCatalogItem}'
*/
show.url = (args: { serviceCatalogItem: string | { slug: string } } | [serviceCatalogItem: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { serviceCatalogItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { serviceCatalogItem: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            serviceCatalogItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        serviceCatalogItem: typeof args.serviceCatalogItem === 'object'
        ? args.serviceCatalogItem.slug
        : args.serviceCatalogItem,
    }

    return show.definition.url
            .replace('{serviceCatalogItem}', parsedArgs.serviceCatalogItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::show
* @see app/Http/Controllers/Public/ServiceCatalogController.php:88
* @route '/layanan/{serviceCatalogItem}'
*/
show.get = (args: { serviceCatalogItem: string | { slug: string } } | [serviceCatalogItem: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::show
* @see app/Http/Controllers/Public/ServiceCatalogController.php:88
* @route '/layanan/{serviceCatalogItem}'
*/
show.head = (args: { serviceCatalogItem: string | { slug: string } } | [serviceCatalogItem: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::show
* @see app/Http/Controllers/Public/ServiceCatalogController.php:88
* @route '/layanan/{serviceCatalogItem}'
*/
const showForm = (args: { serviceCatalogItem: string | { slug: string } } | [serviceCatalogItem: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::show
* @see app/Http/Controllers/Public/ServiceCatalogController.php:88
* @route '/layanan/{serviceCatalogItem}'
*/
showForm.get = (args: { serviceCatalogItem: string | { slug: string } } | [serviceCatalogItem: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ServiceCatalogController::show
* @see app/Http/Controllers/Public/ServiceCatalogController.php:88
* @route '/layanan/{serviceCatalogItem}'
*/
showForm.head = (args: { serviceCatalogItem: string | { slug: string } } | [serviceCatalogItem: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const services = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
}

export default services