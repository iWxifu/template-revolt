import {Member, Permissions} from "revkit"

export const checkPerms = (member:Member, permissions: Array<Permissions>) => {
    let needed: Permissions[] = [];
    permissions.forEach(permission => {
        if(!member.permissions.has(permission)) needed.push(permission)
    });

    if(needed.length === 0) return null;

    return needed.map(p => {
        return Object.keys(Permissions).find(k => Object(Permissions)[k] === p)?.split(/(?=[A-Z])/).join(" ")
    })
}