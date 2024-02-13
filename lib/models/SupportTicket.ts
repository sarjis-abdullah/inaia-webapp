export interface SupportMessages {
    id: number;
    message: string;
    created_by: number;
    support_ticket_id: number;
    created_at: string;
    owner: {
        id: number;
        contact_id: number;
        type_id: number;
        account_number: string;
        username: string;
        is_active: number;
        is_locked: number;
        referral_code: string;
        referral_link: string;
        has_pin: boolean;
        pin_length: number;
        created_at: string;
        sales_advisor_id: number;
        settings: {
            id: number;
            account_id: number;
            name_translation_key: string;
            value: string;
        }[];
        plan_id: number;
        plan: {
            id: number;
            name: string;
            plan_fees: null;
            countries: null;
        };
        plan_fee: null;
        contact: {
            id: number;
            type_id: number;
            name: string;
            is_active: number;
            avatar: string;
            avatar_file: string;
            is_verified: number;
            aml_status_id: number;
            aml_search_id: null;
            aml_status: {
                id: number;
                name: string;
            };
            kyc_status_id: number;
            kyc_status: {
                id: number;
                name: string;
            };
            created_at: string;
            account: null;
            type: null;
            person_data: {
                id: number;
                contact_id: number;
                middlename: null;
                surname: string;
                birthdate: string;
                gender: string;
                birth_place: string;
                nationality_id: number;
                nationality_details: null;
            };
            address: null;
            channels: null;
        };
    };
}

export interface SupportStatus {
    id: number;
    name_translation_key: string;
}

export interface SupportTicket {
    id: number;
    subject: string;
    rating: number | null;
    account_id: number;
    support_status_id: number;
    created_at: string;
    updated_at: string;
    updated_by: number | null;
    updater: any;
    account: {
        id: number;
        contact_id: number;
        type_id: number;
        account_number: string;
        username: string;
        is_active: number;
        is_locked: number;
        referral_code: string;
        referral_link: string;
        has_pin: boolean;
        pin_length: number;
        created_at: string;
        sales_advisor_id: number;
        settings: {
            id: number;
            account_id: number;
            name_translation_key: string;
            value: string;
        }[];
        plan_id: number;
        plan: {
            id: number;
            name: string;
            plan_fees: any;
            countries: any[];
        };
        plan_fee: any;
        contact: {
            id: number;
            type_id: number;
            name: string;
            is_active: number;
            avatar: string;
            avatar_file: string;
            is_verified: number;
            aml_status_id: number;
            aml_search_id: any;
            aml_status: {
                id: number;
                name: string;
            };
            kyc_status_id: number;
            kyc_status: {
                id: number;
                name: string;
            };
            created_at: string;
            account: any;
            type: any;
            person_data: {
                id: number;
                contact_id: number;
                middlename: any;
                surname: string;
                birthdate: string;
                gender: string;
                birth_place: string;
                nationality_id: number;
                nationality_details: any;
            };
            address: any;
            channels: any[];
        };
    };
    support_status: SupportStatus;
    messages: SupportMessages[];
}