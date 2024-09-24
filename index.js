function getDamage() {
    // Character Stats
    let characterLevel = parseFloat(document.getElementById("characterLevel").value);
    let totalAttack = parseFloat(document.getElementById("totalAttack").value);
    let critRate = document.getElementById("critRate").value * 0.01;
    let critDMG = document.getElementById("critDMG").value * 0.01;
    let DMGPercent = document.getElementById("DMGPercent").value * 0.01;
    let defIgnore = document.getElementById("defIgnore").value * 0.01;
    let resPEN = document.getElementById("resPEN").value * 0.01;
    let abilityMultiplier = document.getElementById("abilityMultiplier").value * 0.01;
    let acheronA2 = 1;
    if (document.getElementById("acheronA2_1").checked) {
        acheronA2 = document.getElementById("acheronA2_1").value;
    }
    else if (document.getElementById("acheronA2_2").checked) {
        acheronA2 = document.getElementById("acheronA2_2").value;
    }

    // Enemy Stats
    let enemyLevel = parseFloat(document.getElementById("enemyLevel").value);
    let defReduction = document.getElementById("defReduction").value * 0.01;
    let enemyRES = document.getElementById("enemyRES").value * 0.01;
    let vulnerability = document.getElementById("vulnerability").value * 0.01;
    let brokenMultiplier = 0.9;
    if (document.getElementById("broken").checked) {
        brokenMultiplier = 1;
    }

    // Initial Computations
    let baseDamage = totalAttack * abilityMultiplier;
    let defMultiplier = (characterLevel + 20) / ((enemyLevel + 20) * (1 - defIgnore - defReduction) + characterLevel + 20);
    let resMultiplier = 1 - (enemyRES - resPEN);
    
    // Results
    // Final Crit Damage
    let finalCritDMG = baseDamage * (1 + critDMG) * (1 + DMGPercent) * defMultiplier * resMultiplier * (1 + vulnerability) * brokenMultiplier * acheronA2;
    document.getElementById("finalCritDMG").innerHTML = Math.round(finalCritDMG);

    // Average Damage
    let averageSum = 0.00;
    for (let i = 0; i < 10000; i++) {
        if (Math.random() <= critRate) {
            averageSum += baseDamage * (1 + critDMG) * (1 + DMGPercent) * defMultiplier * resMultiplier * (1 + vulnerability) * brokenMultiplier * acheronA2;
        } else {
            averageSum += baseDamage * (1 + DMGPercent) * defMultiplier * resMultiplier * (1 + vulnerability) * brokenMultiplier * acheronA2;
        }
    }
    document.getElementById("finalAverageDMG").innerHTML = Math.round(averageSum / 10000);
}

function clearInputs() {
    // Character Stats
    document.getElementById("characterLevel").value = 80;
    document.getElementById("totalAttack").value = "";
    document.getElementById("critRate").value = "";
    document.getElementById("critDMG").value = "";
    document.getElementById("DMGPercent").value = "";
    document.getElementById("resPEN").value = "";
    document.getElementById("abilityMultiplier").value = "";
    document.getElementById("acheronA2_1").checked = false;
    document.getElementById("acheronA2_2").checked = false;

    // Enemy Stats
    document.getElementById("enemyLevel").value = 95;
    document.getElementById("defReduction").value = "";
    document.getElementById("enemyRES").value = 20;
    document.getElementById("vulnerability").value = "";
    document.getElementById("broken").checked = false;

}

const acheronA2_1 = document.getElementById("acheronA2_1");
acheronA2_1.addEventListener("click", () => {
        document.getElementById("acheronA2_2").checked = false;
});

const acheronA2_2 = document.getElementById("acheronA2_2");
acheronA2_2.addEventListener("click", () => {
        document.getElementById("acheronA2_1").checked = false;
});

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", getDamage);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearInputs);