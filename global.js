function updateScaleFactor() {
  const scaleFactor = Math.min(
    window.innerWidth / 1920,
    window.innerHeight / 1080
  );
  const clampedScale = Math.max(0.3, Math.min(scaleFactor, 1));
  document.documentElement.style.setProperty('--scale-factor', clampedScale);
}

updateScaleFactor();

window.addEventListener('resize', updateScaleFactor);

function startHudRevealDelay() {
  if (!document.body) return;
  document.body.classList.add('hud-loading');
  setTimeout(() => {
    document.body.classList.remove('hud-loading');
  }, 1500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startHudRevealDelay, { once: true });
} else {
  startHudRevealDelay();
}
function updateAmmo(ammoPercent) {
  if (ammoPercent > 1 && ammoPercent > 55) {
    console.log('test')
  }
}
function updateArmor(armorPercent) {
  armorPercent = Number(armorPercent);
  if (isNaN(armorPercent)) armorPercent = 0;
  armorPercent = Math.max(0, Math.min(100, armorPercent));

  const armorBorderWrapper = document.getElementById('armor-border-wrapper');
  const armorBorderSvg = document.getElementById('armor-border-svg');
  const armorBorderWrapperSecond = document.getElementById('armor-border-wrapper-second');
  const armorBorderSvgSecond = document.getElementById('armor-border-svg-second');

  function updateArmorElement(wrapper, svg) {
    if (!wrapper || !svg) return;

    if (armorPercent <= 0) {
      wrapper.style.display = 'none';
      wrapper.style.maskImage = '';
      wrapper.style.webkitMaskImage = '';
    } else {
      wrapper.style.display = 'block';
      const angle = (armorPercent / 100) * 360;

      const remainingAngle = 360 - angle;
      const maskValue = `conic-gradient(from 0deg, transparent 0deg, transparent ${remainingAngle}deg, black ${remainingAngle}deg, black 360deg)`;
      wrapper.style.maskImage = maskValue;
      wrapper.style.webkitMaskImage = maskValue;
    }
  }

  updateArmorElement(armorBorderWrapper, armorBorderSvg);
  updateArmorElement(armorBorderWrapperSecond, armorBorderSvgSecond);
}

function updateHealth(healthPercent) {
  healthPercent = Number(healthPercent);
  if (isNaN(healthPercent)) healthPercent = 0;
  healthPercent = Math.max(0, Math.min(100, healthPercent));

  const healthBorderWrapper = document.getElementById('health-border-wrapper');
  const healthBorderSvg = document.getElementById('health-border-svg');
  const healthBorderWrapperSecond = document.getElementById('health-border-wrapper-second');
  const healthBorderSvgSecond = document.getElementById('health-border-svg-second');

  function updateHealthElement(wrapper, svg) {
    if (!wrapper || !svg) return;

    if (healthPercent <= 0) {
      wrapper.style.display = 'none';
      wrapper.style.maskImage = '';
      wrapper.style.webkitMaskImage = '';
    } else {
      wrapper.style.display = 'block';
      const angle = (healthPercent / 100) * 360;

      const remainingAngle = 360 - angle;
      const maskValue = `conic-gradient(from 0deg, transparent 0deg, transparent ${remainingAngle}deg, black ${remainingAngle}deg, black 360deg)`;
      wrapper.style.maskImage = maskValue;
      wrapper.style.webkitMaskImage = maskValue;
    }
  }

  updateHealthElement(healthBorderWrapper, healthBorderSvg);
  updateHealthElement(healthBorderWrapperSecond, healthBorderSvgSecond);
}

function updateHunger(hungerPercent) {
  hungerPercent = Number(hungerPercent);
  if (isNaN(hungerPercent)) hungerPercent = 0;
  hungerPercent = Math.max(0, Math.min(100, hungerPercent));

  const hungerBorderWrapper = document.getElementById('hunger-border-wrapper');
  const hungerBorderSvg = document.getElementById('hunger-border-svg');
  const hungerBorderWrapperSecond = document.getElementById('hunger-border-wrapper-second');
  const hungerBorderSvgSecond = document.getElementById('hunger-border-svg-second');

  function updateHungerElement(wrapper, svg) {
    if (!wrapper || !svg) return;

    if (hungerPercent <= 0) {
      wrapper.style.display = 'none';
      wrapper.style.maskImage = '';
      wrapper.style.webkitMaskImage = '';
    } else {
      wrapper.style.display = 'block';
      const angle = (hungerPercent / 100) * 360;

      const remainingAngle = 360 - angle;
      const maskValue = `conic-gradient(from 0deg, transparent 0deg, transparent ${remainingAngle}deg, black ${remainingAngle}deg, black 360deg)`;
      wrapper.style.maskImage = maskValue;
      wrapper.style.webkitMaskImage = maskValue;
    }
  }

  updateHungerElement(hungerBorderWrapper, hungerBorderSvg);
  updateHungerElement(hungerBorderWrapperSecond, hungerBorderSvgSecond);
}

function updateThirst(thirstPercent) {
  thirstPercent = Number(thirstPercent);
  if (isNaN(thirstPercent)) thirstPercent = 0;
  thirstPercent = Math.max(0, Math.min(100, thirstPercent));

  const thirstBorderWrapper = document.getElementById('thirst-border-wrapper');
  const thirstBorderSvg = document.getElementById('thirst-border-svg');
  const thirstBorderWrapperSecond = document.getElementById('thirst-border-wrapper-second');
  const thirstBorderSvgSecond = document.getElementById('thirst-border-svg-second');

  function updateThirstElement(wrapper, svg) {
    if (!wrapper || !svg) return;

    if (thirstPercent <= 0) {
      wrapper.style.display = 'none';
      wrapper.style.maskImage = '';
      wrapper.style.webkitMaskImage = '';
    } else {
      wrapper.style.display = 'block';
      const angle = (thirstPercent / 100) * 360;

      const remainingAngle = 360 - angle;
      const maskValue = `conic-gradient(from 0deg, transparent 0deg, transparent ${remainingAngle}deg, black ${remainingAngle}deg, black 360deg)`;
      wrapper.style.maskImage = maskValue;
      wrapper.style.webkitMaskImage = maskValue;
    }
  }

  updateThirstElement(thirstBorderWrapper, thirstBorderSvg);
  updateThirstElement(thirstBorderWrapperSecond, thirstBorderSvgSecond);
}

function updateStamina(staminaPercent) {
  staminaPercent = Number(staminaPercent);
  if (isNaN(staminaPercent)) staminaPercent = 0;
  staminaPercent = Math.max(0, Math.min(100, staminaPercent));

  const staminaBorderWrapper = document.getElementById('stamina-border-wrapper');
  const staminaBorderSvg = document.getElementById('stamina-border-svg');
  const staminaBorderWrapperSecond = document.getElementById('stamina-border-wrapper-second');
  const staminaBorderSvgSecond = document.getElementById('stamina-border-svg-second');

  function updateStaminaElement(wrapper, svg) {
    if (!wrapper || !svg) return;

    if (staminaPercent <= 0) {
      wrapper.style.display = 'none';
      wrapper.style.maskImage = '';
      wrapper.style.webkitMaskImage = '';
    } else {
      wrapper.style.display = 'block';
      const angle = (staminaPercent / 100) * 360;

      const remainingAngle = 360 - angle;
      const maskValue = `conic-gradient(from 0deg, transparent 0deg, transparent ${remainingAngle}deg, black ${remainingAngle}deg, black 360deg)`;
      wrapper.style.maskImage = maskValue;
      wrapper.style.webkitMaskImage = maskValue;
    }
  }

  updateStaminaElement(staminaBorderWrapper, staminaBorderSvg);
  updateStaminaElement(staminaBorderWrapperSecond, staminaBorderSvgSecond);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    updateArmor(0);
    updateHealth(0);
    updateHunger(0);
    updateThirst(0);
    updateStamina(100);
  });
} else {
  updateArmor(0);
  updateHealth(0);
  updateHunger(0);
  updateThirst(0);
  updateStamina(100);
}

function getWeaponImagePath(weaponName) {
  if (!weaponName) return null;

  const normalizedName = weaponName.toLowerCase();
  const imagePath = `weapons/${normalizedName}.png`;

  return imagePath;
}

function updateWeaponAmmo(weaponAmmo, weaponMaxAmmo, hasWeapon, weaponHash, weaponName) {
  const weaponIcon = document.getElementById('weapon-icon');
  const weaponAmmoText = document.getElementById('weapon-ammo-text');
  const weaponAmmoCurrent = document.getElementById('weapon-ammo-current');
  const weaponAmmoMax = document.getElementById('weapon-ammo-max');
  const ammoIcon = document.getElementById('ammo-icon');

  if (hasWeapon && weaponAmmo !== undefined && weaponMaxAmmo !== undefined) {
    if (weaponIcon) weaponIcon.style.display = 'block';
    if (weaponAmmoText) weaponAmmoText.style.display = 'block';
    if (ammoIcon) ammoIcon.style.display = 'inline-block';

    if (weaponIcon && weaponName) {
      const weaponImagePath = getWeaponImagePath(weaponName);
      if (weaponImagePath) {
        weaponIcon.src = weaponImagePath;
        weaponIcon.onerror = function() {
          weaponIcon.src = 'images/pistol-icon-1.png';
        };
      } else {
        weaponIcon.src = 'images/pistol-icon-1.png';
      }
    } else if (weaponIcon) {
      weaponIcon.src = 'images/pistol-icon-1.png';
    }

    if (weaponAmmoCurrent) weaponAmmoCurrent.textContent = weaponAmmo || 0;
    if (weaponAmmoMax) weaponAmmoMax.textContent = weaponMaxAmmo || 0;
  } else {
    if (weaponIcon) weaponIcon.style.display = 'none';
    if (weaponAmmoText) weaponAmmoText.style.display = 'none';
    if (ammoIcon) ammoIcon.style.display = 'none';
  }
}

function updateHUDData(data) {
  if (data.job !== undefined) {
    const jobElement = document.getElementById('hud-job');
    if (jobElement) {
      jobElement.textContent = data.job;
    }
  }

  if (data.wallet !== undefined) {
    const walletElement = document.getElementById('hud-wallet');
    if (walletElement) {
      walletElement.textContent = '$' + data.wallet.toLocaleString();
    }
  }

  if (data.bank !== undefined) {
    const bankElement = document.getElementById('hud-bank');
    if (bankElement) {
      bankElement.textContent = '$' + data.bank.toLocaleString();
    }
  }

  if (data.compassDirection !== undefined) {
    const compassElement = document.getElementById('compass-direction');
    if (compassElement) {
      compassElement.textContent = data.compassDirection;
    }
  }

  if (data.zoneName !== undefined) {
    const zoneElement = document.getElementById('location-zone');
    if (zoneElement) {
      zoneElement.textContent = data.zoneName;
    }
  }

  if (data.streetName !== undefined) {
    const streetElement = document.getElementById('location-street');
    if (streetElement) {
      streetElement.textContent = data.streetName;
    }
  }

  if (data.weaponAmmo !== undefined || data.weaponMaxAmmo !== undefined) {
    const hasWeapon = data.weaponAmmo !== undefined && data.weaponMaxAmmo !== undefined && data.weaponAmmo > 0;
    updateWeaponAmmo(data.weaponAmmo, data.weaponMaxAmmo, hasWeapon, data.weaponHash, data.weaponName);
  }
}

window.addEventListener('message', function(event) {
  const data = event.data;

  if (data.type === 'updateHUD') {
    if (data.armor !== undefined) {
      updateArmor(data.armor);
    }
    if (data.health !== undefined) {
      updateHealth(data.health);
    }
    if (data.hunger !== undefined) {
      updateHunger(data.hunger);
    }
    if (data.thirst !== undefined) {
      updateThirst(data.thirst);
    }
    if (data.stamina !== undefined) {
      updateStamina(data.stamina);
    }
    if (data.weaponAmmo !== undefined || data.weaponMaxAmmo !== undefined) {
      const hasWeapon = data.weaponAmmo !== undefined && data.weaponMaxAmmo !== undefined && data.weaponAmmo > 0;
      updateWeaponAmmo(data.weaponAmmo, data.weaponMaxAmmo, hasWeapon, data.weaponHash, data.weaponName);
    }
    updateHUDData(data);
  } else if (data.type === 'updateHUDData') {
    updateHUDData(data);
  } else if (data.type === 'setVehicleState') {
    const locationArea = document.querySelector('.location-area');
    const carHud = document.getElementById('section-car-hud');
    if (locationArea) {
      if (data.inVehicle) {
        const savedTheme = localStorage.getItem('hudTheme') || 'Main';
        const isSecondTheme = savedTheme === 'Second';

        if (isSecondTheme) {
          locationArea.style.transform = 'translateY(-80px)';
        } else {
          locationArea.style.transform = 'translateY(-200px)';
        }
        locationArea.style.transition = 'transform 0.3s ease-in-out';
      } else {
        locationArea.style.transform = 'translateY(0px)';
        locationArea.style.transition = 'transform 0.3s ease-in-out';
      }
    }
    if (carHud) {
      if (data.inVehicle) {
        carHud.classList.add('show');
      } else {
        carHud.classList.remove('show');
      }
    }
  } else if (data.type === 'toggleDashboard') {
    const dashboard = document.getElementById('section-dashboard');
    if (dashboard) {
      dashboard.classList.toggle('show');
    }
  } else if (data.type === 'resetHUD') {
    const wrapperIds = [
      'health-border-wrapper', 'health-border-wrapper-second',
      'armor-border-wrapper', 'armor-border-wrapper-second',
      'hunger-border-wrapper', 'hunger-border-wrapper-second',
      'thirst-border-wrapper', 'thirst-border-wrapper-second',
      'stamina-border-wrapper', 'stamina-border-wrapper-second'
    ];

    const svgIds = [
      'health-border-svg', 'health-border-svg-second',
      'armor-border-svg', 'armor-border-svg-second',
      'hunger-border-svg', 'hunger-border-svg-second',
      'thirst-border-svg', 'thirst-border-svg-second',
      'stamina-border-svg', 'stamina-border-svg-second'
    ];

    wrapperIds.forEach(id => {
      const wrapper = document.getElementById(id);
      if (wrapper) {
        wrapper.style.display = 'none';
        wrapper.style.removeProperty('display');
      }
    });

    svgIds.forEach(id => {
      const svg = document.getElementById(id);
      if (svg) {
        svg.style.maskImage = 'none';
        svg.style.webkitMaskImage = 'none';
        svg.style.maskComposite = '';
        svg.style.webkitMaskComposite = '';
        svg.removeAttribute('style');
      }
    });

    document.body.offsetHeight;

    setTimeout(() => {
      const health = data.health !== undefined ? data.health : 100;
      const armor = data.armor !== undefined ? data.armor : 0;
      const hunger = data.hunger !== undefined ? data.hunger : 100;
      const thirst = data.thirst !== undefined ? data.thirst : 100;
      const stamina = data.stamina !== undefined ? data.stamina : 100;

      updateHealth(health);
      updateArmor(armor);
      updateHunger(hunger);
      updateThirst(thirst);
      updateStamina(stamina);
      updateHUDData(data);
    }, 200);
  } else if (data.type === 'updateSpeed') {
    const speed = data.speed || 0;
    const maxSpeed = data.maxSpeed || 200;
    const speedPercent = Math.min((speed / maxSpeed) * 100, 100);
    const clampedPercent = Math.max(0, Math.min(100, speedPercent));

    resetAndAnimateSpeed(clampedPercent);

    const speedValue = document.getElementById('speed-value');
    if (speedValue) {
      speedValue.textContent = Math.round(speed);
    }
  } else if (data.type === 'updateFuel') {
    const fuel = data.fuel || 0;
    const maxFuel = data.maxFuel || 100;
    const fuelPercent = (fuel / maxFuel) * 100;
    const clampedPercent = Math.max(0, Math.min(100, fuelPercent));

    resetAndAnimateFuel(clampedPercent);
  } else if (data.type === 'updateCarHUD') {
    if (typeof data.speed !== 'undefined') {
      const speed = data.speed || 0;
      const maxSpeed = data.maxSpeed || 200;
      const speedPercent = Math.min((speed / maxSpeed) * 100, 100);
      const clampedPercent = Math.max(0, Math.min(100, speedPercent));

      resetAndAnimateSpeed(clampedPercent);

      const speedValue = document.getElementById('speed-value');
      if (speedValue) {
        speedValue.textContent = Math.round(speed);
      }
    }

    if (typeof data.fuel !== 'undefined') {
      const fuel = data.fuel || 0;
      const maxFuel = data.maxFuel || 100;
      const fuelPercent = (fuel / maxFuel) * 100;
      const clampedPercent = Math.max(0, Math.min(100, fuelPercent));

      resetAndAnimateFuel(clampedPercent);
    }
  } else if (data.type === 'setHUDVisible') {
    if (data.visible) {
      document.body.style.display = 'block';
    } else {
      document.body.style.display = 'none';
    }
  }
});

let currentSpeedPercent = 0;
let targetSpeedPercent = 0;
let speedAnimationFrame = null;

let currentFuelPercent = 0;
let targetFuelPercent = 0;
let fuelAnimationFrame = null;

function getColorFilterForPercent(percent) {
  const savedColor = localStorage.getItem('hudPrimaryColor') || '#ff0000';
  const rgb = hexToRgb(savedColor);

  if (!rgb) {
    return 'brightness(0) saturate(0) invert(48%) sepia(100%) saturate(2600%) hue-rotate(90deg)';
  }

  const clamped = Math.max(0, Math.min(100, percent));

  const rNorm = rgb.r / 255;
  const gNorm = rgb.g / 255;
  const bNorm = rgb.b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    if (max === rNorm) {
      h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
    } else if (max === gNorm) {
      h = ((bNorm - rNorm) / d + 2) / 6;
    } else {
      h = ((rNorm - gNorm) / d + 4) / 6;
    }
  }
  const baseHueDeg = h * 360;

  let targetHue;
  if (clamped >= 100) {
    targetHue = baseHueDeg;
  } else {
    const redHue = 0;
    const factor = clamped / 100;
    targetHue = baseHueDeg * factor + redHue * (1 - factor);
  }

  let hueRotate = 90 + (targetHue - 120);
  while (hueRotate < 0) hueRotate += 360;
  while (hueRotate >= 360) hueRotate -= 360;

  const s = max !== min ? (max === 0 ? 0 : (max - min) / max) : 0;
  const saturation = s * 100;
  const filterSaturate = Math.max(6000, saturation * 100);

  const brightnessMultiplier = 3.0;

  return `brightness(0) saturate(0) invert(48%) sepia(100%) saturate(${filterSaturate.toFixed(0)}%) hue-rotate(${hueRotate.toFixed(1)}deg) brightness(${brightnessMultiplier.toFixed(2)})`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getSavedColorFilter() {
  const savedColor = localStorage.getItem('hudPrimaryColor') || '#ff0000';
  const rgb = hexToRgb(savedColor);

  if (!rgb) {
    return 'brightness(0) saturate(0) invert(48%) sepia(100%) saturate(2600%) hue-rotate(90deg)';
  }

  const rNorm = rgb.r / 255;
  const gNorm = rgb.g / 255;
  const bNorm = rgb.b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  if (max !== min) {
    const d = max - min;
    if (max === rNorm) {
      h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
    } else if (max === gNorm) {
      h = ((bNorm - rNorm) / d + 2) / 6;
    } else {
      h = ((rNorm - gNorm) / d + 4) / 6;
    }
  }
  const hueDeg = h * 360;

  let hueRotate = 90 + (hueDeg - 120);
  while (hueRotate < 0) hueRotate += 360;
  while (hueRotate >= 360) hueRotate -= 360;

  const s = max !== min ? (max === 0 ? 0 : (max - min) / max) : 0;
  const saturation = s * 100;
  const filterSaturate = Math.max(6000, saturation * 100);
  const brightnessMultiplier = 3.0;

  return `brightness(0) saturate(0) invert(48%) sepia(100%) saturate(${filterSaturate.toFixed(0)}%) hue-rotate(${hueRotate.toFixed(1)}deg) brightness(${brightnessMultiplier.toFixed(2)})`;
}

function updateSpeedFill(percent) {
  const speedFillSvg = document.getElementById('speed-fill-svg');
  const ringInner = document.querySelector('.ring-inner');

  if (speedFillSvg) {
    const clamped = Math.max(0, Math.min(100, percent));
    const angle = (clamped / 100) * 360;
    const startAngle = 210;
    const maskValue = `conic-gradient(from ${startAngle}deg, black 0deg, black ${angle}deg, transparent ${angle}deg, transparent 360deg)`;
    const wrapper = speedFillSvg.parentElement;
    if (wrapper) {
      wrapper.style.maskImage = maskValue;
      wrapper.style.webkitMaskImage = maskValue;
    }
    speedFillSvg.style.filter = 'none';
    speedFillSvg.style.webkitFilter = 'none';
  }

  if (ringInner) {
    ringInner.style.filter = 'none';
    ringInner.style.webkitFilter = 'none';
  }
}

function updateFuelFill(percent) {
  const fuelFillSvg = document.getElementById('fuel-fill-svg');
  const dot2 = document.querySelector('.dot-2');

  if (fuelFillSvg) {
    const clamped = Math.max(0, Math.min(100, percent));
    const angle = (clamped / 100) * 360;
    const startAngle = 270;
    const remainingAngle = 360 - angle;
    const maskValue = `conic-gradient(from ${startAngle}deg, transparent 0deg, transparent ${remainingAngle}deg, black ${remainingAngle}deg, black 360deg)`;
    const wrapper = fuelFillSvg.parentElement;
    if (wrapper) {
      wrapper.style.maskImage = maskValue;
      wrapper.style.webkitMaskImage = maskValue;
    }
    fuelFillSvg.style.filter = 'none';
    fuelFillSvg.style.webkitFilter = 'none';
  }

  if (dot2) {
    dot2.style.filter = 'none';
    dot2.style.webkitFilter = 'none';
  }
}

function animateSpeedFill() {
  if (Math.abs(currentSpeedPercent - targetSpeedPercent) < 0.1) {
    currentSpeedPercent = targetSpeedPercent;
    updateSpeedFill(currentSpeedPercent);
    if (speedAnimationFrame) {
      cancelAnimationFrame(speedAnimationFrame);
      speedAnimationFrame = null;
    }
    return;
  }

  const diff = targetSpeedPercent - currentSpeedPercent;
  currentSpeedPercent += diff * 0.03;

  updateSpeedFill(currentSpeedPercent);
  speedAnimationFrame = requestAnimationFrame(animateSpeedFill);
}

function resetAndAnimateSpeed(targetPercent) {
  targetSpeedPercent = targetPercent;
  if (speedAnimationFrame) {
    cancelAnimationFrame(speedAnimationFrame);
    speedAnimationFrame = null;
  }
  animateSpeedFill();
}

function animateFuelFill() {
  if (Math.abs(currentFuelPercent - targetFuelPercent) < 0.1) {
    currentFuelPercent = targetFuelPercent;
    updateFuelFill(currentFuelPercent);
    if (fuelAnimationFrame) {
      cancelAnimationFrame(fuelAnimationFrame);
      fuelAnimationFrame = null;
    }
    return;
  }

  const diff = targetFuelPercent - currentFuelPercent;
  currentFuelPercent += diff * 0.03;

  updateFuelFill(currentFuelPercent);
  fuelAnimationFrame = requestAnimationFrame(animateFuelFill);
}

function resetAndAnimateFuel(targetPercent) {
  targetFuelPercent = targetPercent;
  if (fuelAnimationFrame) {
    cancelAnimationFrame(fuelAnimationFrame);
    fuelAnimationFrame = null;
  }
  animateFuelFill();
}

function initializeCarHUD() {
  currentSpeedPercent = 0;
  targetSpeedPercent = 0;
  currentFuelPercent = 0;
  targetFuelPercent = 0;

  const savedColor = localStorage.getItem('hudPrimaryColor');
  if (savedColor) {
    async function updateSVGColor(imgElement, svgPath, color) {
      try {
        const response = await fetch(svgPath);
        if (!response.ok) {
          console.error(`Failed to fetch ${svgPath}:`, response.status);
          return;
        }
        let svgText = await response.text();

        svgText = svgText.replace(/fill="[^"]*"/g, `fill="${color}"`);
        svgText = svgText.replace(/fill='[^']*'/g, `fill='${color}'`);
        svgText = svgText.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
        svgText = svgText.replace(/stroke='[^']*'/g, `stroke='${color}'`);

        if (!svgText.includes('fill=')) {
          svgText = svgText.replace(/<svg/, `<svg fill="${color}"`);
        }

        const dataUri = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgText)));
        imgElement.src = dataUri;
      } catch (error) {
        console.error('Error updating SVG color for', svgPath, ':', error);
      }
    }

    const speedFillSvg = document.getElementById('speed-fill-svg');
    const ringInner = document.querySelector('.ring-inner');
    const fuelFillSvg = document.getElementById('fuel-fill-svg');
    const dot2 = document.querySelector('.dot-2');

    if (speedFillSvg) {
      updateSVGColor(speedFillSvg, 'images/1_8.svg', savedColor);
    }
    if (ringInner) {
      updateSVGColor(ringInner, 'images/1_8.svg', savedColor);
    }
    if (fuelFillSvg) {
      updateSVGColor(fuelFillSvg, 'images/1_18.svg', savedColor);
    }
    if (dot2) {
      updateSVGColor(dot2, 'images/1_18.svg', savedColor);
    }
  }

  updateSpeedFill(0);
  updateFuelFill(0);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeCarHUD();

    setupDashboard();
  });
} else {
  initializeCarHUD();

  setupDashboard();
}

function setupDashboard() {
  const dashboard = document.getElementById('section-dashboard');
  const closeBtn = document.getElementById('close-dashboard');
  const escBtn = document.getElementById('esc-button');

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      if (dashboard) {
        dashboard.classList.remove('show');
        fetch(`https://${window.GetParentResourceName ? window.GetParentResourceName() : 'harunhud'}/closeDashboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
      }
    });
  }

  if (escBtn) {
    escBtn.addEventListener('click', function() {
      if (dashboard) {
        dashboard.classList.remove('show');
        fetch(`https://${window.GetParentResourceName ? window.GetParentResourceName() : 'harunhud'}/closeDashboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
      }
    });
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && dashboard && dashboard.classList.contains('show')) {
      dashboard.classList.remove('show');
      fetch(`https://${window.GetParentResourceName ? window.GetParentResourceName() : 'harunhud'}/closeDashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
    }
  });

  function applyColorToHUD(color) {
    if (!color || typeof color !== 'string' || !color.startsWith('#')) {
      return;
    }

    const rgb = hexToRgb(color);
    if (!rgb) {
      return;
    }

    const rgbColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    document.documentElement.style.setProperty('--hud-primary-color', color);
    document.documentElement.style.setProperty('--hud-primary-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);



    const escButton = document.getElementById('esc-button');
    if (escButton) {
      escButton.style.borderColor = rgbColor;
      escButton.style.color = color;
    }

    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
      dashboardContainer.style.borderColor = rgbColor;
    }

    const separators = document.querySelectorAll('.separator-line, .separator-line-thin');
    separators.forEach(el => {
      el.style.backgroundColor = rgbColor;
    });

    const toggleActive = document.querySelectorAll('.toggle-btn.active');
    toggleActive.forEach(el => {
      el.style.backgroundColor = rgbColor;
    });

    const toggleInactive = document.querySelectorAll('.toggle-btn:not(.active)');
    toggleInactive.forEach(el => {
      el.style.backgroundColor = '#303030';
    });

    const shortcutKeys = document.querySelectorAll('.shortcut-key');
    shortcutKeys.forEach(el => {
      el.style.borderColor = rgbColor;
    });



    const locationPins = document.querySelectorAll('.location-pin::before');

    let styleTag = document.getElementById('dynamic-hud-colors');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'dynamic-hud-colors';
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = '';

    async function updateSVGColor(imgElement, svgPath, color) {
      try {
        const response = await fetch(svgPath);
        if (!response.ok) {
          console.error(`Failed to fetch ${svgPath}:`, response.status);
          return;
        }
        let svgText = await response.text();

        svgText = svgText.replace(/fill="[^"]*"/g, `fill="${color}"`);
        svgText = svgText.replace(/fill='[^']*'/g, `fill='${color}'`);
        svgText = svgText.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
        svgText = svgText.replace(/stroke='[^']*'/g, `stroke='${color}'`);

        if (!svgText.includes('fill=')) {
          svgText = svgText.replace(/<svg/, `<svg fill="${color}"`);
        }

        const dataUri = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgText)));
        imgElement.src = dataUri;
      } catch (error) {
        console.error('Error updating SVG color for', svgPath, ':', error);
      }
    }

    const svgMappings = [
      { selector: '.ring-bg', path: 'images/1_5.svg' },
      { selector: '.ring-fill', path: 'images/1_6.svg' },
      { selector: '.ring-border', path: 'images/1_8.svg' },
      { selector: '.armor-border-svg', path: 'images/1_39.svg' },
      { selector: '.ring-inner', path: 'images/1_8.svg' },
      { selector: '#speed-fill-svg', path: 'images/1_8.svg' },
      { selector: '.dot-2', path: 'images/1_18.svg' },
      { selector: '#fuel-fill-svg', path: 'images/1_18.svg' }
    ];

    const updatePromises = [];
    svgMappings.forEach(({ selector, path }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el.tagName === 'IMG') {
          if (!el.dataset.originalSrc) {
            el.dataset.originalSrc = el.src;
          }
          updatePromises.push(updateSVGColor(el, path, color));
        }
      });
    });

    Promise.all(updatePromises).catch(error => {
      console.error('Error updating SVG colors:', error);
    });

    styleTag.textContent += `
    `;

    const rNorm = rgb.r / 255;
    const gNorm = rgb.g / 255;
    const bNorm = rgb.b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0;
    if (max !== min) {
      const d = max - min;
      if (max === rNorm) {
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
      } else if (max === gNorm) {
        h = ((bNorm - rNorm) / d + 2) / 6;
      } else {
        h = ((rNorm - gNorm) / d + 4) / 6;
      }
    }
    const hueDeg = h * 360;

    let hueRotate = 90 + (hueDeg - 120);
    while (hueRotate < 0) hueRotate += 360;
    while (hueRotate >= 360) hueRotate -= 360;

    const s = max !== min ? (max === 0 ? 0 : (max - min) / max) : 0;
    const saturation = s * 100;
    const filterSaturate = Math.max(6000, saturation * 100);

    const brightnessMultiplier = 3.0;

    const pngFilter = `brightness(0) saturate(0) invert(48%) sepia(100%) saturate(${filterSaturate.toFixed(0)}%) hue-rotate(${hueRotate.toFixed(1)}deg) brightness(${brightnessMultiplier.toFixed(2)})`;

    const fuelIcon = document.querySelector('.fuel-icon');
    if (fuelIcon) {
      fuelIcon.style.filter = 'brightness(0) invert(1)';
      fuelIcon.style.webkitFilter = 'brightness(0) invert(1)';
    }

    const ammoIcon = document.getElementById('ammo-icon');
    if (ammoIcon) {
      // Color is now handled via mask-image and --hud-primary-color in CSS
    }

    const editIcons = document.querySelectorAll('.edit-icon');
    editIcons.forEach(icon => {
      icon.style.filter = 'brightness(0) invert(1)';
      icon.style.webkitFilter = 'brightness(0) invert(1)';
    });

    const carStatusItems = document.querySelectorAll('.car-status-item img');
    carStatusItems.forEach(img => {
      img.style.filter = 'brightness(0) invert(1)';
      img.style.webkitFilter = 'brightness(0) invert(1)';
    });

    localStorage.setItem('hudPrimaryColor', color);

    if (typeof currentSpeedPercent !== 'undefined') {
      updateSpeedFill(currentSpeedPercent);
    }

    if (typeof currentFuelPercent !== 'undefined') {
      updateFuelFill(currentFuelPercent);
    }

    styleTag.textContent += `
      .location-pin::before {
        background-color: ${rgbColor} !important;
      }
      .hexagon-bg {
        background-color: ${rgbColor} !important;
        filter: none !important;
      }
      .status-badge {
        background-color: ${rgbColor} !important;
        border-color: ${rgbColor} !important;
        filter: none !important;
      }
      .status-badge span {
        color: #ffffff !important;
        filter: none !important;
        position: relative;
        z-index: 10;
      }
    `;
  }

  const colorBoxes = document.querySelectorAll('.color-box[data-color-type]');

  let savedColor = localStorage.getItem('hudPrimaryColor');
  if (!savedColor) {
    savedColor = '#ff0000';
  }
  const primaryColorPicker = document.querySelector('.color-picker[data-color-type="primary"]');
  if (primaryColorPicker) {
    primaryColorPicker.value = savedColor;
  }
  applyColorToHUD(savedColor);

  colorBoxes.forEach(colorBox => {
    const colorType = colorBox.getAttribute('data-color-type');
    const colorPicker = document.querySelector(`.color-picker[data-color-type="${colorType}"]`);
    const colorCode = document.querySelector(`.color-code[data-color-type="${colorType}"]`);
    const settingRow = colorBox.closest('.setting-row');
    const saveBtn = settingRow ? settingRow.querySelector('.save-btn') : null;

    if (colorPicker && colorCode) {
      const initialColor = (savedColor && colorType === 'primary') ? savedColor : colorPicker.value;
      colorBox.style.backgroundColor = initialColor;
      colorCode.textContent = initialColor.toUpperCase();
      colorPicker.value = initialColor;

      colorBox.addEventListener('click', function() {
        colorPicker.click();
      });

      colorPicker.addEventListener('input', function(e) {
        const selectedColor = e.target.value;
        colorBox.style.backgroundColor = selectedColor;
        colorCode.textContent = selectedColor.toUpperCase();
      });

      colorPicker.addEventListener('change', function(e) {
        const selectedColor = e.target.value;
        colorBox.style.backgroundColor = selectedColor;
        colorCode.textContent = selectedColor.toUpperCase();
      });

      if (saveBtn && colorType === 'primary') {
        saveBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const selectedColor = colorPicker.value;
          if (selectedColor && selectedColor.startsWith('#')) {
            applyColorToHUD(selectedColor);
          }
        });
      }
    }
  });

  const toggleGroups = document.querySelectorAll('.toggle-group');

  toggleGroups.forEach(toggleGroup => {
    const toggleButtons = toggleGroup.querySelectorAll('.toggle-btn');
    const settingRow = toggleGroup.closest('.setting-row');

    toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
        toggleButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.style.backgroundColor = '';
        });

        this.classList.add('active');

        const savedColor = localStorage.getItem('hudPrimaryColor');
        if (savedColor) {
          this.style.backgroundColor = savedColor;
        }

        if (settingRow) {
          const rowText = settingRow.querySelector('.row-text h3');
          if (rowText && rowText.textContent === 'HUD Theme') {
            const theme = this.textContent.trim();
            handleHUDThemeChange(theme);
          }
        }
      });
    });
  });

  function handleHUDThemeChange(theme) {
    const statusBarSecond = document.getElementById('status-bar-second');
    const locationArea = document.querySelector('.location-area');

    localStorage.setItem('hudTheme', theme);

    fetch(`https://${window.GetParentResourceName ? window.GetParentResourceName() : 'harunhud'}/setTheme`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ theme: theme })
    });

    if (theme === 'Second') {
      const statusBarMain = document.getElementById('status-bar-main');
      if (statusBarMain) {
        statusBarMain.style.display = 'none';
      }

      if (statusBarSecond) {
        statusBarSecond.style.display = 'flex';
        statusBarSecond.style.visibility = 'visible';
      }

      if (locationArea) {
        locationArea.classList.add('theme-second');
      }

      syncAllStatusToSecond();
    } else {
      const statusBarMain = document.getElementById('status-bar-main');
      if (statusBarMain) {
        statusBarMain.style.display = 'flex';
      }

      if (statusBarSecond) {
        statusBarSecond.style.display = 'none';
        statusBarSecond.style.visibility = 'hidden';
      }

      if (locationArea) {
        locationArea.classList.remove('theme-second');
      }
    }
  }

  function syncAllStatusToSecond() {
    function syncBorderElement(wrapperId, svgId, wrapperIdSecond, svgIdSecond) {
      const wrapper = document.getElementById(wrapperId);
      const svg = document.getElementById(svgId);
      const wrapperSecond = document.getElementById(wrapperIdSecond);
      const svgSecond = document.getElementById(svgIdSecond);

      if (wrapper && wrapperSecond && svg && svgSecond) {
        wrapperSecond.style.display = wrapper.style.display || wrapper.getAttribute('style')?.includes('display: none') ? 'none' : 'block';

        if (wrapper.style.maskImage || wrapper.style.webkitMaskImage) {
          wrapperSecond.style.maskImage = wrapper.style.maskImage || '';
          wrapperSecond.style.webkitMaskImage = wrapper.style.webkitMaskImage || '';
        } else {
          const computedStyle = window.getComputedStyle(wrapper);
          if (computedStyle.maskImage && computedStyle.maskImage !== 'none') {
            wrapperSecond.style.maskImage = computedStyle.maskImage;
            wrapperSecond.style.webkitMaskImage = computedStyle.webkitMaskImage;
          }
        }
      }
    }

    syncBorderElement('voice-border-wrapper', 'voice-border-svg', 'voice-border-wrapper-second', 'voice-border-svg-second');

    syncBorderElement('health-border-wrapper', 'health-border-svg', 'health-border-wrapper-second', 'health-border-svg-second');

    syncBorderElement('armor-border-wrapper', 'armor-border-svg', 'armor-border-wrapper-second', 'armor-border-svg-second');

    syncBorderElement('hunger-border-wrapper', 'hunger-border-svg', 'hunger-border-wrapper-second', 'hunger-border-svg-second');

    syncBorderElement('thirst-border-wrapper', 'thirst-border-svg', 'thirst-border-wrapper-second', 'thirst-border-svg-second');

    syncBorderElement('stamina-border-wrapper', 'stamina-border-svg', 'stamina-border-wrapper-second', 'stamina-border-svg-second');

    const staminaWrapper = document.getElementById('stamina-border-wrapper');
    if (staminaWrapper && staminaWrapper.style.display !== 'none') {
      if (staminaWrapper && staminaWrapper.style.maskImage) {
        const staminaWrapperSecond = document.getElementById('stamina-border-wrapper-second');
        if (staminaWrapperSecond) {
          staminaWrapperSecond.style.display = 'block';
          staminaWrapperSecond.style.maskImage = staminaWrapper.style.maskImage;
          staminaWrapperSecond.style.webkitMaskImage = staminaWrapper.style.webkitMaskImage;
        }
      }
    }
  }

  function syncHungerThirstToSecond() {
    syncAllStatusToSecond();
  }

  const savedTheme = localStorage.getItem('hudTheme') || 'Main';

  const statusBarSecond = document.getElementById('status-bar-second');
  if (statusBarSecond && savedTheme !== 'Second') {
    statusBarSecond.style.display = 'none';
    statusBarSecond.style.visibility = 'hidden';
  }

  handleHUDThemeChange(savedTheme);

  fetch(`https://${window.GetParentResourceName ? window.GetParentResourceName() : 'harunhud'}/setTheme`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ theme: savedTheme })
  });

  const hudThemeToggle = document.querySelector('.setting-row .row-text h3');
  if (hudThemeToggle && hudThemeToggle.textContent === 'HUD Theme') {
    const toggleGroup = hudThemeToggle.closest('.setting-row').querySelector('.toggle-group');
    if (toggleGroup) {
      const toggleButtons = toggleGroup.querySelectorAll('.toggle-btn');
      const savedColor = localStorage.getItem('hudPrimaryColor');

      toggleButtons.forEach(btn => {
        if (btn.textContent.trim() === savedTheme) {
          btn.classList.add('active');
          if (savedColor) {
            btn.style.backgroundColor = savedColor;
          }
        } else {
          btn.classList.remove('active');
          btn.style.backgroundColor = '#303030';
        }
      });
    }
  }
}
