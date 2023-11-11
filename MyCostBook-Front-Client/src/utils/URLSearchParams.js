export function createURLObj(...rest) {
    const keys = Object.keys(...rest)
    const values = Object.values(...rest)
    const params = new URLSearchParams()
    for (let i = 0; i < keys.length; i++) {
        params.append(keys[i], values[i])
    }
    return params
}