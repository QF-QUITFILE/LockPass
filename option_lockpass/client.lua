local Promise = nil
local NewPass = nil

ESX = nil
Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end
end)

RegisterNUICallback('PadLockClose', function(_, cb)
    SetNuiFocus(false, false)
    NewPass = nil
    Promise:resolve(false)
    cb('ok')
end)

RegisterNUICallback("CombinationFail", function(_, cb)
    PlaySound(-1, "Place_Prop_Fail", "DLC_Dmod_Prop_Editor_Sounds", 0, 0, 1)
    NewPass = nil
    Promise:resolve(false)
    cb("ok")
end)

RegisterNUICallback('TryCombination', function(data, cb)
    SetNuiFocus(false, false)
    NewPass = tonumber(data.combination)
    Promise:resolve(true)
end)


-- RegisterCommand('startKeypad', function()
--     local a = exports['option_lockpass']:startKeypad()

-- end)

exports('startKeypad', function(tries)
    SendNUIMessage({
        action = "openKeypad",
    })
    SetNuiFocus(true, true)

    Promise = promise.new()

    local result = Citizen.Await(Promise)

    if result then
        return NewPass
    else
        return nil
    end
end)