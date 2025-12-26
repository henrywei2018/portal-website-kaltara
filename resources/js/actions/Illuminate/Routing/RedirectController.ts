import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
const RedirectControllere9819db9819a1d19b38dd89a0c4218c4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'get',
})

RedirectControllere9819db9819a1d19b38dd89a0c4218c4.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/register',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url = (options?: RouteQueryOptions) => {
    return RedirectControllere9819db9819a1d19b38dd89a0c4218c4.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'head',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'put',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'patch',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'delete',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'options',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
const RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url(options),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/register'
*/
RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: RedirectControllere9819db9819a1d19b38dd89a0c4218c4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'OPTIONS',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

RedirectControllere9819db9819a1d19b38dd89a0c4218c4.form = RedirectControllere9819db9819a1d19b38dd89a0c4218c4Form
/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
const RedirectController0c70edcc722471a5b69e029da05ad7cd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

RedirectController0c70edcc722471a5b69e029da05ad7cd.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cd.url = (options?: RouteQueryOptions) => {
    return RedirectController0c70edcc722471a5b69e029da05ad7cd.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'head',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cd.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cd.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'put',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cd.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'patch',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cd.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'delete',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cd.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'options',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
const RedirectController0c70edcc722471a5b69e029da05ad7cdForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cdForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cdForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cdForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cdForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cdForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cdForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \Illuminate\Routing\RedirectController::__invoke
* @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
* @route '/admin/settings'
*/
RedirectController0c70edcc722471a5b69e029da05ad7cdForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'OPTIONS',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

RedirectController0c70edcc722471a5b69e029da05ad7cd.form = RedirectController0c70edcc722471a5b69e029da05ad7cdForm

const RedirectController = {
    '/register': RedirectControllere9819db9819a1d19b38dd89a0c4218c4,
    '/admin/settings': RedirectController0c70edcc722471a5b69e029da05ad7cd,
}

export default RedirectController