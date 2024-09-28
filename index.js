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
    let baseDamage = totalAttack * abilityMultiplier;
    let acheronA2 = 1;
    if ($("#acheronA2_1").prop("checked")) {
        acheronA2 = $("#acheronA2_1").val();
    } else if ($("#acheronA2_2").prop("checked")) {
        acheronA2 = $("#acheronA2_2").val();
    }

    // Enemy Stats
    let enemyLevel = parseFloat($("#enemyLevel").val());
    let defReduction = $("#defReduction").val() * 0.01;
    let defMultiplier = (characterLevel + 20) / ((enemyLevel + 20) * (1 - defIgnore - defReduction) + characterLevel + 20);
    let enemyRES = $("#enemyRES").val() * 0.01;
    let resMultiplier = 1 - (enemyRES - resPEN);
    let vulnerability = $("#vulnerability").val() * 0.01;
    let brokenMultiplier = 0.9;
    if ($("#broken").prop("checked")) {
        brokenMultiplier = 1;
    }

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

function getBreakDamage(characterType) {
    // Character Stats
    let characterLevel = parseFloat($("#characterLevel").val());
    let breakEffect = $("#breakEffect").val() * 0.01;
    let superBreakMultiplier = $("#superBreakMultiplier").val() * 0.01;
    let baseToughnessReduction = parseFloat($("#baseToughnessReduction").val());
    let weaknessBreakEfficiency = $("#weaknessBreakEfficiency").val() * 0.01;
    let defIgnore = $("#defIgnoreBreak").val() * 0.01;
    let resPEN = $("#resPENBreak").val() * 0.01;
    let finalToughnessReduction = baseToughnessReduction * (1 + weaknessBreakEfficiency);
    const levelMultiplier = [
        54.0000, 58.0000, 62.0000, 67.5264, 70.5094, 73.5228, 76.5660, 79.6385, 82.7395, 85.8684,
        91.4944, 97.0680, 102.5892, 108.0579, 113.4743, 118.8383, 124.1499, 129.4091, 134.6159, 139.7703,
        149.3323, 158.8011, 168.1768, 177.4594, 186.6489, 195.7452, 204.7484, 213.6585, 222.4754, 231.1992,
        246.4276, 261.1810, 275.4733, 289.3179, 302.7275, 315.7144, 328.2905, 340.4671, 352.2554, 363.6658,
        408.1240, 451.7883, 494.6798, 536.8188, 578.2249, 618.9172, 658.9138, 698.2325, 736.8905, 774.9041, 
        871.0599, 964.8705, 1056.4206, 1145.7910, 1233.0585, 1318.2965, 1401.5750, 1482.9608, 1562.5178, 1640.3068,
        1752.3215, 1861.9011, 1969.1242, 2074.0659, 2176.7983, 2277.3904, 2375.9085, 2472.4160, 2566.9739,  2659.6406,
        2780.3044, 2898.6022, 3014.6029, 3128.3729, 3239.9758, 3349.4730, 3456.9236, 3562.3843, 3665.9099, 3767.5533
    ];

    // Enemy Stats
    let enemyLevel = parseFloat($("#enemyLevelBreak").val());
    let maxToughness = parseFloat($("#maxToughness").val())
    let toughnessMultiplier = 0.5 + (maxToughness / 40);
    let defReduction = $("#defReductionBreak").val() * 0.01;
    let defMultiplier = (characterLevel + 20) / ((enemyLevel + 20) * (1 - defIgnore - defReduction) + characterLevel + 20);
    let enemyRES = $("#enemyRESBreak").val() * 0.01;
    let resMultiplier = 1 - (enemyRES - resPEN);
    let vulnerability = $("#vulnerabilityBreak").val() * 0.01;
    let brokenMultiplier = 0.9;
    if ($("#brokenBreak").prop("checked")) {
        brokenMultiplier = 1;
    }

    // Results
    // Super Break Damage
    let finalSuperBreakDMG = levelMultiplier[characterLevel - 1] * (finalToughnessReduction / 10) * (1 + breakEffect) * 
    (1 + superBreakMultiplier) * defMultiplier * resMultiplier * (1 + vulnerability) * brokenMultiplier;
    $("#finalSuperBreakDMG").prop("innerHTML", Math.round(finalSuperBreakDMG));

    // Break Damage
    let breakBaseDMG;
    if (characterType == "physical" || characterType == "fire") {
        breakBaseDMG = 2 * levelMultiplier[characterLevel - 1] * toughnessMultiplier;
    } else if (characterType == "ice" || characterType == "lightning") {
        breakBaseDMG = 1 * levelMultiplier[characterLevel - 1] * toughnessMultiplier;
    } else if (characterType == "wind") {
        breakBaseDMG = 1.5 * levelMultiplier[characterLevel - 1] * toughnessMultiplier;
    } else if (characterType == "quantum" || characterType == "imaginary") {
        breakBaseDMG = 0.5 * levelMultiplier[characterLevel - 1] * toughnessMultiplier;
    } else {
        $("#finalBreakDMG").prop("innerHTML", "Missing Character Type.");
        return;
    }
    let finalBreakDMG = breakBaseDMG * (1 + breakEffect) * defMultiplier * resMultiplier * (1 + vulnerability) * brokenMultiplier;
    $("#finalBreakDMG").prop("innerHTML", Math.round(finalBreakDMG));
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

function clearInputsBreak() {
    // Character Stats
    $("#characterLevelBreak").val(80);
    $("#breakEffect").val("");
    $("#superBreakMultiplier").val(100);
    $("#baseToughnessReduction").val("");
    $("#weaknessBreakEfficiency").val("");
    $("#defIgnoreBreak").val("");
    $("#resPENBreak").val("");

    // Enemy Stats
    $("#enemyLevelBreak").val(95);
    $("#maxToughness").val("");
    $("#defReductionBreak").val("");
    $("#enemyRESBreak").val(20);
    $("#vulnerabilityBreak").val("");
    $("#brokenBreak").prop("checked", false);
}

function clearTypeButtons() {
    $(".typeButton").removeClass("clicked");
    $(".clicked").addClass("typeButton").removeClass("clicked")
}

let buttonBackgroundColor = "#683737";
let hoverBackgroundColor = "#412b2b";
let characterType = "";

$("#breakDMGInputs").hide().removeClass("hidden").addClass("inputs");
$("#enemyStatsBreak").hide().removeClass("hidden").addClass("inputs");
$("#buttonsBreak").hide().removeClass("hidden").addClass("buttonsWrapper");
$("#resultsBreak").hide().removeClass("hidden").addClass("results");


$("#breakDMG").click(() => {
    $("#breakDMGInputs").show();
    $("#enemyStatsBreak").show();
    $("#buttonsBreak").show();
    $("#resultsBreak").show();
    $("#normalDMGInputs").hide();
    $("#enemyStats").hide();
    $("#buttonsNormal").hide();
    $("#resultsNormal").hide();
}); 

$("#normalDMG").click(() => {
    $("#normalDMGInputs").show();
    $("#enemyStats").show();
    $("#buttonsNormal").show();
    $("#resultsNormal").show();
    $("#breakDMGInputs").hide();
    $("#enemyStatsBreak").hide();
    $("#buttonsBreak").hide();
    $("#resultsBreak").hide();
});

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

$("#submitBreak").click(() => {
    getBreakDamage(characterType);
});

$("#clearBreak").click(() => {
    clearInputsBreak();
    clearTypeButtons();
});

// Type Buttons
$("#physical").click(() => {
    clearTypeButtons();
    $("#physical").addClass("clicked").removeClass("typeButton");
    characterType = "physical";
});
$("#fire").click(() => {
    clearTypeButtons();
    $("#fire").addClass("clicked").removeClass("typeButton");
    characterType = "fire";
});
$("#ice").click(() => {
    clearTypeButtons();
    $("#ice").addClass("clicked").removeClass("typeButton");
    characterType = "ice";
});
$("#lightning").click(() => {
    clearTypeButtons();
    $("#lightning").addClass("clicked").removeClass("typeButton");
    characterType = "lightning";
});
$("#wind").click(() => {
    clearTypeButtons();
    $("#wind").addClass("clicked").removeClass("typeButton");
    characterType = "wind";
});
$("#quantum").click(() => {
    clearTypeButtons();
    $("#quantum").addClass("clicked").removeClass("typeButton");
    characterType = "quantum";
});
$("#imaginary").click(() => {
    clearTypeButtons();
    $("#imaginary").addClass("clicked").removeClass("typeButton");
    characterType = "imaginary";
});
