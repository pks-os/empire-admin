export default ({ store, route, redirect }) => {
    if (!store.state.user.login) {
        return redirect('/login')
    }
}