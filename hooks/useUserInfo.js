import { computed, ref } from "vue";

export function useUserInfo(contact) {

    const getFullName = () => {
        let name = contact.name ?? "";
        if (contact?.person_data) {
            if (contact.person_data.middlename) {
                name += ' ' + contact.person_data.middlename;
            }
            name += ' ' + contact.person_data.surname;
        }
        return name;
    }
    return {
        ...contact,
        fullName: getFullName()
    }
}
