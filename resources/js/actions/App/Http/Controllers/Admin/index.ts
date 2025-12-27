import UserManagementController from './UserManagementController'
import ServiceSectorController from './ServiceSectorController'
import NavigationController from './NavigationController'
import PageController from './PageController'
import ContentController from './ContentController'
import DocumentItemController from './DocumentItemController'

const Admin = {
    UserManagementController: Object.assign(UserManagementController, UserManagementController),
    ServiceSectorController: Object.assign(ServiceSectorController, ServiceSectorController),
    NavigationController: Object.assign(NavigationController, NavigationController),
    PageController: Object.assign(PageController, PageController),
    ContentController: Object.assign(ContentController, ContentController),
    DocumentItemController: Object.assign(DocumentItemController, DocumentItemController),
}

export default Admin