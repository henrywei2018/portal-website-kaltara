import Public from './Public'
import Admin from './Admin'
import Settings from './Settings'

const Controllers = {
    Public: Object.assign(Public, Public),
    Admin: Object.assign(Admin, Admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers