export interface AppState {
    favourites: string[],
}

export interface RocketLaunchList {
    rocket_name: string;
}

export interface LaunchSiteLaunchList {
    site_name: string;
}

export interface LaunchPastLaunchList {
    details: string;
    id: string;
    launch_date_utc: string;
    rocket: RocketLaunchList;
    launch_site: LaunchSiteLaunchList;
    launch_success?: boolean;
    mission_id: string[];
    mission_name: string;
}




