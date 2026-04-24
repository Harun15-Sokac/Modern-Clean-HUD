
ESX = exports['es_extended']:getSharedObject()
DisplayRadar(false)


local hunger = 100
local thirst = 100

local stamina = 100

local isHudHidden = false

local ResetHUDValues
local cachedHUD = {}
local lastCoords = vec3(0, 0, 0)
local cachedZone = ""
local cachedStreet = ""
local cachedCompass = ""
local cachedJob = ""
local cachedWallet = -1
local cachedBank = -1

local function RefreshMinimap()
    Citizen.CreateThread(function()
        Wait(1000)
        SetRadarBigmapEnabled(true, false)
        Wait(100)
        SetRadarBigmapEnabled(false, false)
    end)
end

local function UpdateStatus()
    if GetResourceState('esx_status') == 'started' then
        TriggerEvent('esx_status:getStatus', 'hunger', function(status)
            if status then
                hunger = math.floor(status.percent or 100)
            end
        end)

        TriggerEvent('esx_status:getStatus', 'thirst', function(status)
            if status then
                thirst = math.floor(status.percent or 100)
            end
        end)
    else
        local PlayerData = ESX.GetPlayerData()
        if PlayerData and PlayerData.status then
            for i=1, #PlayerData.status, 1 do
                if PlayerData.status[i].name == 'hunger' then
                    hunger = math.floor(PlayerData.status[i].percent or 100)
                elseif PlayerData.status[i].name == 'thirst' then
                    thirst = math.floor(PlayerData.status[i].percent or 100)
                end
            end
        end
    end
end

Citizen.CreateThread(function()
    while ESX.GetPlayerData().job == nil do
        Citizen.Wait(100)
    end
    UpdateStatus()
end)

RegisterNetEvent('esx_status:onTick')
AddEventHandler('esx_status:onTick', function(data)
    for i=1, #data, 1 do
        if data[i].name == 'hunger' then
            hunger = math.floor(data[i].percent or 100)
        elseif data[i].name == 'thirst' then
            thirst = math.floor(data[i].percent or 100)
        end
    end
end)
RegisterNetEvent("esx:playerLoaded", function()
    Wait(500)
    RefreshMinimap()
    TriggerEvent('hud:client:LoadMap')
    SendHUDConfig()
end)
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    Wait(500)
    RefreshMinimap()
    TriggerEvent('hud:client:LoadMap')
    Wait(1000)
    ResetHUDValues()
    SendHUDConfig()
end)
CreateThread(function()
    SetMinimapComponentPosition("minimap", "L", "B", -0.03, -0.02, 0.1815, 0.207777)
    SetMinimapComponentPosition("minimap_mask", "L", "B", -0.02, 0.01, 0.1343, 0.1749)
    SetMinimapComponentPosition("minimap_blur", "L", "B", -0.04, -0.01, 0.3219, 0.2607)
    SetMinimapClipType(0)
    RefreshMinimap()

    local wasInVehicle = false
    local firstCheck = true
    local lastTheme = nil

    Wait(1500)
    while true do
        local sleep = 1000
        local playerPed = PlayerPedId()

        if not isHudHidden then
            local isInVehicle = IsPedInAnyVehicle(playerPed, false)
            local showRadar = isInVehicle or Config.AlwaysMap

            if showRadar then
                sleep = isInVehicle and 100 or 1000
                DisplayRadar(true)
                SetRadarBigmapEnabled(false, false)
                
                if wasInVehicle ~= isInVehicle or lastTheme ~= currentTheme or firstCheck then
                    if currentTheme == 'Second' then
                        SetMinimapComponentPosition("minimap", "L", "B", -0.01, -0.05, 0.1815, 0.207777)
                        SetMinimapComponentPosition("minimap_mask", "L", "B", 0.00, -0.02, 0.1343, 0.1749)
                        SetMinimapComponentPosition("minimap_blur", "L", "B", -0.01, -0.04, 0.3219, 0.2607)
                    else
                        SetMinimapComponentPosition("minimap", "L", "B", -0.03, -0.02, 0.1815, 0.207777)
                        SetMinimapComponentPosition("minimap_mask", "L", "B", -0.02, 0.01, 0.1343, 0.1749)
                        SetMinimapComponentPosition("minimap_blur", "L", "B", -0.04, -0.01, 0.3219, 0.2607)
                    end

                    SendNUIMessage({ type = 'setVehicleState', inVehicle = isInVehicle, alwaysMap = Config.AlwaysMap })
                    wasInVehicle = isInVehicle
                    lastTheme = currentTheme
                    firstCheck = false
                end

                if isInVehicle then
                    local vehicle = GetVehiclePedIsIn(playerPed, false)
                    if vehicle and vehicle > 0 then
                        local speed = GetEntitySpeed(vehicle) * 3.6
                        local fuel = 100
                        local fuelLevel = nil
                        if Entity(vehicle) and Entity(vehicle).state and Entity(vehicle).state.fuel ~= nil then
                            fuelLevel = Entity(vehicle).state.fuel
                        else
                            fuelLevel = GetVehicleFuelLevel(vehicle)
                        end

                        if fuelLevel and fuelLevel >= 0 then
                            if fuelLevel <= 1.0 and fuelLevel > 0.0 and GetVehicleClass(vehicle) ~= 13 then
                                fuel = fuelLevel * 100
                            else
                                fuel = fuelLevel
                            end
                        end
                        fuel = math.max(0, math.min(100, fuel))

                        SendNUIMessage({
                            type = 'updateCarHUD',
                            speed = math.floor(speed),
                            maxSpeed = GetVehicleEstimatedMaxSpeed(vehicle) * 3.6,
                            fuel = fuel,
                            maxFuel = 100
                        })
                    end
                end
            else
                if wasInVehicle ~= false or firstCheck then
                    DisplayRadar(false)
                    SendNUIMessage({ type = 'setVehicleState', inVehicle = false, alwaysMap = Config.AlwaysMap })
                    wasInVehicle = false
                    firstCheck = false
                end
            end
            
            -- Set Radar Zoom here to avoid extra thread
            SetRadarZoom(1100)
        end
        Wait(sleep)
    end
end)
Citizen.CreateThread(function()
    local minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(false, false)
    while true do
        Wait(1000)
        BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
        ScaleformMovieMethodAddParamInt(3)
        EndScaleformMovieMethod()
    end
end)
Citizen.CreateThread(function()
    SetNuiFocus(false, false)
end)

local function GetCompassDirection(heading)
    if heading >= 337.5 or heading < 22.5 then
        return "N"
    elseif heading >= 22.5 and heading < 67.5 then
        return "NE"
    elseif heading >= 67.5 and heading < 112.5 then
        return "E"
    elseif heading >= 112.5 and heading < 157.5 then
        return "SE"
    elseif heading >= 157.5 and heading < 202.5 then
        return "S"
    elseif heading >= 202.5 and heading < 247.5 then
        return "SW"
    elseif heading >= 247.5 and heading < 292.5 then
        return "W"
    elseif heading >= 292.5 and heading < 337.5 then
        return "NW"
    end
    return "N"
end

RegisterNetEvent('esx:setJob', function(job)
    if job then
        local jobName = job.label or job.name or "Unemployed"
        local jobGrade = job.grade_label or job.grade_name or ""
        cachedJob = (jobGrade ~= "") and (jobName .. " - " .. jobGrade) or jobName
        SendNUIMessage({ type = 'updateHUD', job = cachedJob })
    end
end)

RegisterNetEvent('esx:setAccountMoney', function(account)
    if account.name == 'money' or account.name == 'cash' then
        cachedWallet = account.money
        SendNUIMessage({ type = 'updateHUD', wallet = cachedWallet })
    elseif account.name == 'bank' then
        cachedBank = account.money
        SendNUIMessage({ type = 'updateHUD', bank = cachedBank })
    end
end)

local function GetJob()
    local playerData = ESX and ESX.GetPlayerData()
    if playerData and playerData.job then
        local job = playerData.job
        local jobName = job.label or job.name or "Unemployed"
        local jobGrade = job.grade_label or job.grade_name or ""
        return (jobGrade ~= "") and (jobName .. " - " .. jobGrade) or jobName
    end
    return "Unemployed"
end

local function GetMoney()
    local wallet, bank = 0, 0
    
    local oxSuccess, oxWallet, oxBank = pcall(function()
        local w = exports.ox_inventory:Search('count', 'money')
        if type(w) == 'table' then w = 0 end
        if not w or w == 0 then 
            local c = exports.ox_inventory:Search('count', 'cash')
            if type(c) == 'number' then w = c end
        end
        if not w then w = 0 end
        
        local b = 0
        local success, result = pcall(function() return exports.ox_inventory:GetAccount('bank') end)
        if success and type(result) == 'table' and result.money then b = result.money end
        if b == 0 then
            local success2, result2 = pcall(function() return exports.ox_inventory:Search('count', 'bank') end)
            if success2 and type(result2) == 'number' then b = result2 end
        end
        return w, b
    end)
    
    local usedOxWallet = false
    if oxSuccess and type(oxWallet) == 'number' then
        wallet, bank = oxWallet, (oxBank or 0)
        usedOxWallet = true
    end

    if not usedOxWallet then
        local playerData = ESX and ESX.GetPlayerData()
        if playerData then
            wallet = playerData.money or 0
        end
    end

    if bank == 0 then
        local playerData = ESX and ESX.GetPlayerData()
        if playerData and playerData.accounts then
            for _, acc in ipairs(playerData.accounts) do
                if acc.name == 'bank' then bank = acc.money or acc.balance or 0 break end
            end
        end
    end
    
    return wallet, bank
end

Citizen.CreateThread(function()
    local lastSlowUpdate = 0
    local lastMoneyUpdate = 0
    while true do
        Wait(1000) -- Check stats once per second
        local now = GetGameTimer()
        local playerPed = PlayerPedId()
        
        local updateData = {}
        local shouldSend = false

        local health = math.floor((GetEntityHealth(playerPed) / GetEntityMaxHealth(playerPed)) * 100)
        local armor = GetPedArmour(playerPed)
        local stamina = 100 - math.floor(GetPlayerSprintStaminaRemaining(PlayerId()))
        local currentHunger = hunger or 100
        local currentThirst = thirst or 100
        
        if health ~= cachedHUD.health then updateData.health = health; cachedHUD.health = health; shouldSend = true end
        if armor ~= cachedHUD.armor then updateData.armor = armor; cachedHUD.armor = armor; shouldSend = true end
        if stamina ~= cachedHUD.stamina then updateData.stamina = stamina; cachedHUD.stamina = stamina; shouldSend = true end
        if currentHunger ~= cachedHUD.hunger then updateData.hunger = currentHunger; cachedHUD.hunger = currentHunger; shouldSend = true end
        if currentThirst ~= cachedHUD.thirst then updateData.thirst = currentThirst; cachedHUD.thirst = currentThirst; shouldSend = true end

        local weapon = GetSelectedPedWeapon(playerPed)
        if weapon ~= GetHashKey('WEAPON_UNARMED') then
            local ammo = GetAmmoInPedWeapon(playerPed, weapon)
            local maxAmmo = GetMaxAmmoInClip(playerPed, weapon, true)
            if ammo ~= cachedHUD.ammo or maxAmmo ~= cachedHUD.maxAmmo or weapon ~= cachedHUD.weapon then
                updateData.weaponAmmo, updateData.weaponMaxAmmo, updateData.weaponHash = ammo, maxAmmo, weapon
                if weapon ~= cachedHUD.weapon then
                    local name = nil
                    local success, res = pcall(function() return exports.ox_inventory:GetCurrentWeapon() end)
                    if success and res then name = res.name or res.item or res.weapon end
                    
                    if not name and ESX and ESX.GetWeaponList then
                        local weaponList = ESX.GetWeaponList()
                        for i=1, #weaponList do
                            if GetHashKey(weaponList[i].name) == weapon then
                                name = string.lower(weaponList[i].name)
                                break
                            end
                        end
                    end
                    
                    cachedHUD.weaponName = name
                end
                updateData.weaponName = cachedHUD.weaponName
                cachedHUD.ammo, cachedHUD.maxAmmo, cachedHUD.weapon = ammo, maxAmmo, weapon
                shouldSend = true
            end
        elseif cachedHUD.weapon ~= 0 then
            updateData.weaponAmmo, updateData.weaponMaxAmmo, cachedHUD.weapon = 0, 0, 0
            shouldSend = true
        end

        if now - (lastMoneyUpdate or 0) > 2000 then
            lastMoneyUpdate = now
            local job = GetJob()
            if job ~= cachedJob then updateData.job = job; cachedJob = job; shouldSend = true end
            
            local w, b = GetMoney()
            if w ~= cachedWallet then updateData.wallet = w; cachedWallet = w; shouldSend = true end
            if b ~= cachedBank then updateData.bank = b; cachedBank = b; shouldSend = true end
        end

        if now - lastSlowUpdate > 2000 then
            lastSlowUpdate = now
            local playerCoords = GetEntityCoords(playerPed)
            
            if #(playerCoords - lastCoords) > 2.0 then
                lastCoords = playerCoords
                local heading = GetEntityHeading(playerPed)
                local compass = GetCompassDirection(heading)
                if compass ~= cachedCompass then updateData.compassDirection = compass; cachedCompass = compass; shouldSend = true end
                
                local zoneName = GetNameOfZone(playerCoords.x, playerCoords.y, playerCoords.z)
                local zoneLabel = GetLabelText(zoneName)
                if zoneLabel == "NULL" or zoneLabel == "" then zoneLabel = zoneName end
                if zoneLabel ~= cachedZone then updateData.zoneName = zoneLabel; cachedZone = zoneLabel; shouldSend = true end
                
                local streetHash = GetStreetNameAtCoord(playerCoords.x, playerCoords.y, playerCoords.z)
                local streetName = GetStreetNameFromHashKey(streetHash)
                if streetName == "" then streetName = "Unknown Street" end
                if streetName ~= cachedStreet then updateData.streetName = streetName; cachedStreet = streetName; shouldSend = true end
            end
        end


        if shouldSend then
            updateData.type = 'updateHUD'
            SendNUIMessage(updateData)
        end
    end
end)

local function SendMoneyData()
    local wallet, bank = GetMoney()
    if wallet ~= cachedWallet or bank ~= cachedBank then
        cachedWallet = wallet
        cachedBank = bank
        SendNUIMessage({
            type = 'updateHUDData',
            wallet = wallet,
            bank = bank
        })
    end
end

RegisterNetEvent('ox_inventory:updateInventory')
AddEventHandler('ox_inventory:updateInventory', function()
    Wait(100)
    SendMoneyData()
end)

RegisterNetEvent('esx:setAccountMoney')
AddEventHandler('esx:setAccountMoney', function(account)
    Wait(100)
    SendMoneyData()
end)

RegisterNetEvent('QBCore:Client:OnMoneyChange')
AddEventHandler('QBCore:Client:OnMoneyChange', function()
    Wait(100)
    SendMoneyData()
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function()
    Wait(1000)
    SendMoneyData()
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded')
AddEventHandler('QBCore:Client:OnPlayerLoaded', function()
    Wait(1000)
    SendMoneyData()
    SendHUDConfig()
end)

function SendHUDConfig()
    SendNUIMessage({
        type = 'updateVisibility',
        health = Config.EnableHealth,
        armor = Config.EnableArmor,
        hunger = Config.EnableHunger,
        thirst = Config.EnableThirst,
        stamina = Config.EnableStamina,
        wallet = Config.EnableWallet,
        bank = Config.EnableBank,
        job = Config.EnableJob,
        location = Config.EnableLocation,
        voice = Config.EnableVoice
    })
end

RegisterNetEvent('hud:client:SendConfig')
AddEventHandler('hud:client:SendConfig', function()
    SendHUDConfig()
end)

local lastHealth = 100
local wasDeadRecently = false

CreateThread(function()
    while true do
        Wait(1000)
        local playerPed = PlayerPedId()
        local currentHealth = GetEntityHealth(playerPed)
        local maxHealth = GetEntityMaxHealth(playerPed)

        if lastHealth <= 0 and currentHealth > 50 then
            wasDeadRecently = true
            Wait(1000)
            ResetHUDValues()
            wasDeadRecently = false
        end

        lastHealth = currentHealth
    end
end)

RegisterNetEvent('esx:onPlayerSpawn')
AddEventHandler('esx:onPlayerSpawn', function()
    Wait(1500)
    ResetHUDValues()
    SendHUDConfig()
end)

local dashboardOpen = false

RegisterCommand(Config.SettingsCommand, function()
    dashboardOpen = not dashboardOpen
    SetNuiFocus(dashboardOpen, dashboardOpen)
    SendNUIMessage({
        type = 'toggleDashboard'
    })
end, false)

ResetHUDValues = function()
    local playerPed = PlayerPedId()
    local currentHealth = GetEntityHealth(playerPed)
    local maxHealth = GetEntityMaxHealth(playerPed)
    local healthPercent = math.max(0, math.min(((currentHealth - 100) / (maxHealth - 100)) * 100, 100))
    local armor = GetPedArmour(playerPed)
    local hungerPercent = math.max(0, math.min(hunger or 100, 100))
    local thirstPercent = math.max(0, math.min(thirst or 100, 100))
    local staminaRemaining = GetPlayerSprintStaminaRemaining(PlayerId())
    local staminaPercent = math.max(0, math.min(100 - staminaRemaining, 100))
    
    local wallet, bank = GetMoney()
    local job = GetJob()

    SendNUIMessage({
        type = 'resetHUD',
        health = healthPercent,
        armor = armor,
        hunger = hungerPercent,
        thirst = thirstPercent,
        stamina = staminaPercent,
        job = job,
        wallet = wallet,
        bank = bank
    })
    SendNUIMessage({ type = 'setVehicleState', inVehicle = IsPedInAnyVehicle(playerPed, false), alwaysMap = Config.AlwaysMap })
    SendHUDConfig()
end

RegisterCommand('resethud', function()
    ResetHUDValues()
    RefreshMinimap()
end, false)

RegisterNUICallback('closeDashboard', function(data, cb)
    dashboardOpen = false
    SetNuiFocus(false, false)
    cb('ok')
end)

local currentTheme = 'Main'
RegisterNUICallback('setTheme', function(data, cb)
    if data.theme then
        currentTheme = data.theme
        if currentTheme == 'Second' then
            SetMinimapComponentPosition("minimap", "L", "B", -0.01, -0.05, 0.1815, 0.207777)
            SetMinimapComponentPosition("minimap_mask", "L", "B", 0.00, -0.02, 0.1343, 0.1749)
            SetMinimapComponentPosition("minimap_blur", "L", "B", -0.01, -0.04, 0.3219, 0.2607)
        else
            SetMinimapComponentPosition("minimap", "L", "B", -0.03, -0.02, 0.1815, 0.207777)
            SetMinimapComponentPosition("minimap_mask", "L", "B", -0.02, 0.01, 0.1343, 0.1749)
            SetMinimapComponentPosition("minimap_blur", "L", "B", -0.04, -0.01, 0.3219, 0.2607)
        end
    end
    cb('ok')
end)



RegisterNetEvent('harunhud:toggleHud', function(state)
    isHudHidden = not state
    SendNUIMessage({
        type = 'setHUDVisible',
        visible = state
    })

    if isHudHidden then
        DisplayRadar(false)
    end
end)

exports('ToggleHud', function(state)
    TriggerEvent('harunhud:toggleHud', state)
end)
