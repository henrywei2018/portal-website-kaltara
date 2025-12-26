import UserManagementController from './UserManagementController'
import NavigationController from './NavigationController'
import PageController from './PageController'
import ContentController from './ContentController'

const Admin = {
    UserManagementController: Object.assign(UserManagementController, UserManagementController),
    NavigationController: Object.assign(NavigationController, NavigationController),
    PageController: Object.assign(PageController, PageController),
    ContentController: Object.assign(ContentController, ContentController),
}

export default Admin