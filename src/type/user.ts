export interface ListInt {
    id: number,
    nickName: string,
    role: RoleInt[],
    userName: string
}

interface RoleInt{
    role: number,
    roleName: string
}

interface SelectDataInt{
    role:number,
    nickName:string
}

interface RoleListInt{
    authority:number[]
    roleId:number,
    roleName:string
}

export class InitData{
    selectData:SelectDataInt = {
        role: 0,
        nickName:"",
    }
    list:ListInt[] = []
    roleList:RoleListInt[] = []
}