import Toggle from "./Toggle"

type SettingsProps = {
    settings: { [key: string]: boolean }
    onToggle: (key: string, value: boolean) => void
}

export default function Settings({settings, onToggle}: SettingsProps) {
    return(
        <div className="flex flex-wrap gap-4">
            <Toggle 
                label="Information Textbox" 
                defaultChecked={settings.showText} 
                onToggle={(value) => onToggle("showText", value)}
                darkMode={settings.darkMode}
            />
            <Toggle 
                label="Access Code" 
                defaultChecked={settings.showAccessCode} 
                onToggle={(value) => onToggle("showAccessCode", value)}
                darkMode={settings.darkMode}
            />
            <Toggle 
                label="Keep Screen On" 
                defaultChecked={settings.keepScreenOn} 
                onToggle={(value) => onToggle("keepScreenOn", value)}
                darkMode={settings.darkMode}
            />
            <Toggle 
                label="Dark Mode" 
                defaultChecked={settings.darkMode} 
                onToggle={(value) => onToggle("darkMode", value)}
                darkMode={settings.darkMode}
            />
        </div>
    )
}