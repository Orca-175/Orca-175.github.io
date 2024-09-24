function getDamage() {
    // Character Stats
    let characterLevel = parseFloat($("#characterLevel").val());
    let totalAttack = parseFloat($("#totalAttack").val());
    let critRate = $("#critRate").val() * 0.01;
    let critDMG = $("#critDMG").val() * 0.01;
    let DMGPercent = $("#DMGPercent").val() * 0.01;
    let defIgnore = $("#defIgnore").val() * 0.01;
    let resPEN = $("#resPEN").val() * 0.01;
    let abilityMultiplier = $("#abilityMultiplier").val() * 0.01;
    let acheronA2 = 1;
    if ($("#acheronA2_1").prop("checked")) {
        acheronA2 = $("#acheronA2_1").val();
    }
    else if ($("#acheronA2_2").prop("checked")) {
        acheronA2 = $("#acheronA2_2").val();
    }

    // Enemy Stats
    let enemyLevel = parseFloat($("#enemyLevel").val());
    let defReduction = $("#defReduction").val() * 0.01;
    let enemyRES = $("#enemyRES").val() * 0.01;
    let vulnerability = $("#vulnerability").val() * 0.01;
    let brokenMultiplier = 0.9;
    if ($("#broken").prop("checked")) {
        brokenMultiplier = 1;
    }

    // Initial Computations
    let baseDamage = totalAttack * abilityMultiplier;
    let defMultiplier = (characterLevel + 20) / ((enemyLevel + 20) * (1 - defIgnore - defReduction) + characterLevel + 20);
    let resMultiplier = 1 - (enemyRES - resPEN);
    
    // Results
    // Final Crit Damage
    let finalCritDMG = baseDamage * (1 + critDMG) * (1 + DMGPercent) * defMultiplier * resMultiplier * (1 + vulnerability) * brokenMultiplier * acheronA2;
    $("#finalCritDMG").prop("innerHTML", Math.round(finalCritDMG));

    // Average Damage
    let averageSum = 0.00;
    for (let i = 0; i < 10000; i++) {
        if (Math.random() <= critRate) {
            averageSum += baseDamage * (1 + critDMG) * (1 + DMGPercent) * defMultiplier * resMultiplier * (1 + vulnerability) * brokenMultiplier * acheronA2;
        } else {
            averageSum += baseDamage * (1 + DMGPercent) * defMultiplier * resMultiplier * (1 + vulnerability) * brokenMultiplier * acheronA2;
        }
    }
    $("#finalAverageDMG").prop("innerHTML", Math.round(averageSum / 10000));
}

function clearInputs() {
    // Character Stats
    $("#characterLevel").val(80);
    $("#totalAttack").val("");
    $("#critRate").val("");
    $("#critDMG").val("");
    $("#DMGPercent").val("");
    $("#resPEN").val("");
    $("#abilityMultiplier").val("");
    $("#acheronA2_1").prop("checked", false);
    $("#acheronA2_2").prop("checked", false);

    // Enemy Stats
    $("#enemyLevel").val(95);
    $("#defReduction").val("");
    $("#enemyRES").val(20);
    $("#vulnerability").val("");
    $("#broken").prop("checked", false);

}

$("#acheronA2_1").click(() => {
    $("#acheronA2_2").prop("checked", false);
});

$("#acheronA2_2").click(() => {
    $("#acheronA2_1").prop("checked", false);
});

$("#submit").click(() => {
    getDamage();
});

$("#clear").click(() => {
    clearInputs();
});