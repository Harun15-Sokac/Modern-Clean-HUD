Framework = {}

-- Initialize Framework
function Framework:Init()
    if Config.Framework == 'esx' then
        if IsDuplicityVersion() then
            self.Obj = exports['es_extended']:getSharedObject()
        else
            self.Obj = exports['es_extended']:getSharedObject()
        end
    elseif Config.Framework == 'qb' then
        if IsDuplicityVersion() then
            self.Obj = exports['qb-core']:GetCoreObject()
        else
            self.Obj = exports['qb-core']:GetCoreObject()
        end
    end
end

-- Exported function to get framework object
function GetFramework()
    return Framework.Obj
end

-- Exported function to show HUD
function ShowHUD(bool)
    if Config.Framework == 'esx' then
        -- ESX HUD Logic
        if bool then
            TriggerEvent('esx_status:setDisplay', 1.0)
        else
            TriggerEvent('esx_status:setDisplay', 0.0)
        end
    elseif Config.Framework == 'qb' then
        -- Qbox/QB HUD Logic
        if bool then
            TriggerEvent('qb-hud:client:SetMainHUD', true)
        else
            TriggerEvent('qb-hud:client:SetMainHUD', false)
        end
    end
end

-- Exported function for notifications
function Notify(msg, type)
    if Config.Framework == 'esx' then
        if IsDuplicityVersion() then
            -- Server side notification not directly in ESX object usually, but can be done
            -- TriggerClientEvent('esx:showNotification', source, msg)
        else
            Framework.Obj.ShowNotification(msg)
        end
    elseif Config.Framework == 'qb' then
        if IsDuplicityVersion() then
            -- TriggerClientEvent('QBCore:Notify', source, msg, type)
        else
            exports['qb-core']:DrawText(msg, type) -- or standard Notify
            TriggerEvent('QBCore:Notify', msg, type)
        end
    end
end

-- Initialize on script start
CreateThread(function()
    Framework:Init()
end)

-- Register Exports
exports('GetFramework', GetFramework)
exports('ShowHUD', ShowHUD)
exports('Notify', Notify)
