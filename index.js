function getDamage(stats) {
    // Crit Damage
    let finalCritDMG = stats.baseDamage * (1 + stats.critDMG) * (1 + stats.DMGPercent) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * 
    stats.brokenMultiplier * stats.acheronA4;

    if (abilityType == "blast") {
        finalCritDMG += getBlastDamageCrit(stats);
        $("#finalCritDMG").prop("innerHTML", Math.round(finalCritDMG));
    } else if (abilityType == "bounce") {
        $("#finalCritDMG").prop("innerHTML", Math.round(finalCritDMG * stats.bounceHits));
    } else {
        $("#finalCritDMG").prop("innerHTML", Math.round(finalCritDMG * stats.enemyCount));
    }

    // Average Damage
    let averageSum = 0.00;
    for (let i = 0; i < 10000; i++) {
        if (Math.random() <= stats.critRate) {
            averageSum += stats.baseDamage * (1 + stats.critDMG) * (1 + stats.DMGPercent) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * 
            stats.brokenMultiplier * stats.acheronA4;
        } else {
            averageSum += stats.baseDamage * (1 + stats.DMGPercent) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * stats.brokenMultiplier * 
            stats.acheronA4;
        }
    }

    if (abilityType == "blast") {
        averageSum += getBlastDamageAverage(stats);
        $("#finalAverageDMG").prop("innerHTML", Math.round(averageSum / 10000));
    } else if (abilityType == "bounce") {
        $("#finalAverageDMG").prop("innerHTML", Math.round(averageSum / 10000) * stats.bounceHits);
    } else {
        $("#finalAverageDMG").prop("innerHTML", Math.round((averageSum / 10000) * stats.enemyCount));
    }
}

function getBlastDamageCrit(stats) {
    let finalCritDMG = stats.blastBaseDamage * (1 + stats.critDMG) * (1 + stats.DMGPercent) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * 
    stats.brokenMultiplier * stats.acheronA4;
    return finalCritDMG * stats.blastCount;
}

function getBlastDamageAverage(stats) {
    let averageSum = 0.00;
    for (let i = 0; i < 10000; i++) {
        if (Math.random() <= stats.critRate) {
            averageSum += stats.baseDamage * (1 + stats.critDMG) * (1 + stats.DMGPercent) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * 
            stats.brokenMultiplier * stats.acheronA4;
        } else {
            averageSum += stats.baseDamage * (1 + stats.DMGPercent) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * statsbrokenMultiplier * 
            stats.acheronA4;
        }
    }
    return averageSum * stats.blastCount;
}

function getBreakDamage(stats) {
    // Results
    // Super Break Damage
    let finalSuperBreakDMG;
    if (abilityTypeBreak == "blast") {
        finalSuperBreakDMG = stats.levelMultiplier[stats.characterLevel - 1] * (stats.finalToughnessReduction / 10) * (1 + stats.breakEffect) * 
        (1 + stats.superBreakMultiplier) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * stats.brokenMultiplier;
        finalSuperBreakDMG += (stats.levelMultiplier[stats.characterLevel - 1] * (stats.blastFinalToughnessReduction / 10) * (1 + stats.breakEffect) * 
        (1 + stats.superBreakMultiplier) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * stats.brokenMultiplier) * stats.blastCount;
        $("#finalSuperBreakDMG").prop("innerHTML", Math.round(finalSuperBreakDMG));
    } else if (abilityTypeBreak == "bounce" && stats.bounceFirstHit == "") {
        finalSuperBreakDMG = stats.levelMultiplier[stats.characterLevel - 1] * (stats.finalToughnessReduction / 10) * (1 + stats.breakEffect) * 
        (1 + stats.superBreakMultiplier) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * stats.brokenMultiplier * stats.bounceHits;
        $("#finalSuperBreakDMG").prop("innerHTML", Math.round(finalSuperBreakDMG));
    } else if (abilityTypeBreak == "bounce" && stats.bounceFirstHit > 0) {
        finalSuperBreakDMG = stats.levelMultiplier[stats.characterLevel - 1] * (stats.finalToughnessReduction / 10) * (1 + stats.breakEffect) * 
        (1 + stats.superBreakMultiplier) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * stats.brokenMultiplier * (stats.bounceHits - 1);
        finalSuperBreakDMG += stats.levelMultiplier[stats.characterLevel - 1] * (stats.firstHitToughnessReduction / 10) * (1 + stats.breakEffect) * 
        (1 + stats.superBreakMultiplier) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * stats.brokenMultiplier;
        $("#finalSuperBreakDMG").prop("innerHTML", Math.round(finalSuperBreakDMG));
    } else {
        $("#finalSuperBreakDMG").prop("innerHTML", Math.round(finalSuperBreakDMG * stats.enemyCount));
    }

    // Break Damage
    let breakBaseDMG;
    if (characterType == "physical" || characterType == "fire") {
        breakBaseDMG = 2 * stats.levelMultiplier[stats.characterLevel - 1] * stats.toughnessMultiplier;
    } else if (characterType == "ice" || stats.characterType == "lightning") {
        breakBaseDMG = 1 * stats.levelMultiplier[stats.characterLevel - 1] * stats.toughnessMultiplier;
    } else if (characterType == "wind") {
        breakBaseDMG = 1.5 * stats.levelMultiplier[stats.characterLevel - 1] * stats.toughnessMultiplier;
    } else if (characterType == "quantum" || characterType == "imaginary") {
        breakBaseDMG = 0.5 * stats.levelMultiplier[stats.characterLevel - 1] * stats.toughnessMultiplier;
    } else {
        $("#finalBreakDMG").prop("innerHTML", "Missing Character Type");
        return;
    }
    let finalBreakDMG = breakBaseDMG * (1 + stats.breakEffect) * stats.defMultiplier * stats.resMultiplier * (1 + stats.vulnerability) * stats.brokenMultiplier;
    $("#finalBreakDMG").prop("innerHTML", Math.round(finalBreakDMG * stats.enemyCount));
}

function clearInputs() {
    // Character Stats
    $("#characterLevel").val(80);
    $("#totalAttack").val("");
    $("#abilityMultiplier").val("");
    $("#blastMultiplier").val("");
    $("#bounceHits").val("");
    $("#critRate").val("5");
    $("#critDMG").val("50");
    $("#DMGPercent").val("");
    $("#defIgnore").val("");
    $("#resPEN").val("");
    $("#acheronA2_1").prop("checked", false);
    $("#acheronA2_2").prop("checked", false);

   // Enemy Stats
    $("#enemyLevel").val(95);
    $("#enemyCount").val(1);
    $("#defReduction").val("");
    $("#enemyRES").val(20);
    $("#vulnerability").val("");
    $("#broken").prop("checked", false);
}

function clearInputsBreak() {
    // Character Stats
    $("#characterLevelBreak").val(80);
    $("#breakEffect").val("");
    $("#baseToughnessReduction").val("");
    $("#blastToughnessReduction").val("");
    $("#bounceHitsBreak").val("");
    $("#bounceFirstHit").val("");
    $("#superBreakMultiplier").val(100);
    $("#weaknessBreakEfficiency").val("");
    $("#defIgnoreBreak").val("");
    $("#resPENBreak").val("");
    clearTypeButtons();

    // Enemy Stats
    $("#enemyLevelBreak").val(95);
    $("#enemyCountBreak").val(1);
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

let characterType = "";
let abilityType = "normal";
let abilityTypeBreak = "normal";

$("#breakDMGInputs").hide().removeClass("hidden");
$("#enemyStatsBreak").hide().removeClass("hidden");
$("#buttonsBreak").hide().removeClass("hidden");
$("#resultsBreak").hide().removeClass("hidden");
$("#blastInput").hide().removeClass("hidden");
$("#bounceInput").hide().removeClass("hidden");
$("#blastInputBreak").hide().removeClass("hidden");
$(".bounceClassBreak").hide().removeClass("hidden");

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

$("#acheronA4_1").click(() => {
    $("#acheronA4_2").prop("checked", false);
});

$("#acheronA4_2").click(() => {
    $("#acheronA4_1").prop("checked", false);
});

$("#blastButton").click(() => {
    $("#blastInput").toggle();
    if ($("#bounceInput").is(":visible")) {
        $("#bounceInput").hide();
    }
    if (abilityType == "blast") {
        abilityType = "normal";
    } else {
        abilityType = "blast";
    }
});

$("#bounceButton").click(() => {
    $("#bounceInput").toggle();
    if ($("#blastInput").is(":visible")) {
        $("#blastInput").hide();
    }
    if (abilityType == "bounce") {
        abilityType = "normal";
    } else {
        abilityType = "bounce";
    }
});

$("#blastButtonBreak").click(() => {
    $("#blastInputBreak").toggle();
    if ($(".bounceClassBreak").is(":visible")) {
        $(".bounceClassBreak").hide();
    }
    if (abilityTypeBreak == "blast") {
        abilityTypeBreak = "normal";
    } else {
        abilityTypeBreak = "blast";
    }
});

$("#bounceButtonBreak").click(() => {
    $(".bounceClassBreak").toggle();
    if ($("#blastInputBreak").is(":visible")) {
        $("#blastInputBreak").hide();
    }
    if (abilityTypeBreak == "bounce") {
        abilityTypeBreak = "normal";
    } else {
        abilityTypeBreak = "bounce";
    }
});

$("#submit").click(() => {
    const stats = new function Stats_Normal() {
        // Character Stats
        this.characterLevel = parseFloat($("#characterLevel").val());
        this.totalAttack = parseFloat($("#totalAttack").val());
        this.abilityMultiplier = $("#abilityMultiplier").val() * 0.01;
        this.blastMultiplier = $("#blastMultiplier").val() * 0.01;
        this.bounceHits = parseInt($("#bounceHits").val());
        this.baseDamage = this.totalAttack * this.abilityMultiplier;
        this.blastBaseDamage = this.totalAttack * this.blastMultiplier;
        this.critRate = $("#critRate").val() * 0.01;
        this.critDMG = $("#critDMG").val() * 0.01;
        this.DMGPercent = $("#DMGPercent").val() * 0.01;
        this.defIgnore = $("#defIgnore").val() * 0.01;
        this.resPEN = $("#resPEN").val() * 0.01;
        this.acheronA4 = 1;
        if ($("#acheronA4_1").prop("checked")) {
            this.acheronA4 = $("#acheronA4_1").val();
        } else if ($("#acheronA4_2").prop("checked")) {
            this.acheronA4 = $("#acheronA4_2").val();
        }

        // Enemy Stats
        this.enemyLevel = parseFloat($("#enemyLevel").val());
        this.enemyCount = parseInt($("#enemyCount").val());
        if (this.enemyCount >= 3) {
            this.blastCount = 3;
        } else if (this.enemyCount <= 2) {
            this.blastCount = this.enemyCount - 1;
        }
        this.defReduction = $("#defReduction").val() * 0.01;
        this.defMultiplier = (this.characterLevel + 20) / ((this.enemyLevel + 20) * (1 - this.defIgnore - this.defReduction) + this.characterLevel + 20);
        this.enemyRES = $("#enemyRES").val() * 0.01;
        this.resMultiplier = 1 - (this.enemyRES - this.resPEN);
        this.vulnerability = $("#vulnerability").val() * 0.01;
        this.brokenMultiplier = 0.9;
        if ($("#broken").prop("checked")) {
            this.brokenMultiplier = 1;
        }
    }
    getDamage(stats);
});

$("#clear").click(() => {
    clearInputs();
});

$("#submitBreak").click(() => {
    const stats = new function Stats_Break() {
        // Character Stats
        this.characterLevel = parseFloat($("#characterLevelBreak").val());
        this.breakEffect = $("#breakEffect").val() * 0.01;
        this.superBreakMultiplier = $("#superBreakMultiplier").val() * 0.01;
        this.baseToughnessReduction = parseFloat($("#baseToughnessReduction").val());
        this.blastToughnessReduction = parseFloat($("#blastToughnessReduction").val());
        this.bounceHits = parseInt($("#bounceHitsBreak").val());
        this.bounceFirstHit = $("#bounceFirstHit").val() * 0.01;
        this.weaknessBreakEfficiency = $("#weaknessBreakEfficiency").val() * 0.01;
        this.defIgnore = $("#defIgnoreBreak").val() * 0.01;
        this.resPEN = $("#resPENBreak").val() * 0.01;
        this.finalToughnessReduction = this.baseToughnessReduction * (1 + this.weaknessBreakEfficiency);
        this.blastFinalToughnessReduction = this.blastToughnessReduction * (1 + this.weaknessBreakEfficiency);
        this.firstHitToughnessReduction = this.baseToughnessReduction * (1 + this.bounceFirstHit + this.weaknessBreakEfficiency);
        this.levelMultiplier = [
            54.0000, 58.0000, 62.0000, 67.5264, 70.5094, 73.5228, 76.5660, 79.6385, 82.7395, 85.8684,
            91.4944, 97.0680, 102.5892, 108.0579, 113.4743, 118.8383, 124.1499, 129.4091, 134.6159, 139.7703,
            149.3323, 158.8011, 168.1768, 177.4594, 186.6489, 195.7452, 204.7484, 213.6585, 222.4754, 231.1992,
            246.4276, 261.1810, 275.4733, 289.3179, 302.7275, 315.7144, 328.2905, 340.4671, 352.2554, 363.6658,
            408.1240, 451.7883, 494.6798, 536.8188, 578.2249, 618.9172, 658.9138, 698.2325, 736.8905, 774.9041, 
            871.0599, 964.8705, 1056.4206, 1145.7910, 1233.0585, 1318.2965, 1401.5750, 1482.9608, 1562.5178, 1640.3068,
            1752.3215, 1861.9011, 1969.1242, 2074.0659, 2176.7983, 2277.3904, 2375.9085, 2472.4160, 2566.9739, 2659.6406,
            2780.3044, 2898.6022, 3014.6029, 3128.3729, 3239.9758, 3349.4730, 3456.9236, 3562.3843, 3665.9099, 3767.5533
        ];

        // Enemy Stats
        this.enemyLevel = parseFloat($("#enemyLevelBreak").val());
        this.enemyCount = parseInt($("#enemyCountBreak").val());
        if (this.enemyCount >= 3) {
            this.blastCount = 2;
        } else if (this.enemyCount <= 2) {
            this.blastCount = this.enemyCount - 1;
        }
        this.maxToughness = parseFloat($("#maxToughness").val())
        this.toughnessMultiplier = 0.5 + (this.maxToughness / 40);
        this.defReduction = $("#defReductionBreak").val() * 0.01;
        this.defMultiplier = (this.characterLevel + 20) / ((this.enemyLevel + 20) * (1 - this.defIgnore - this.defReduction) + this.characterLevel + 20);
        this.enemyRES = $("#enemyRESBreak").val() * 0.01;
        this.resMultiplier = 1 - (this.enemyRES - this.resPEN);
        this.vulnerability = $("#vulnerabilityBreak").val() * 0.01;
        this.brokenMultiplier = 0.9;
        if ($("#brokenBreak").prop("checked")) {
            this.brokenMultiplier = 1;
        }
    }
    getBreakDamage(stats);
});

$("#clearBreak").click(() => {
    clearInputsBreak();
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

// Resources from the wiki played a big part in the creation of this site.