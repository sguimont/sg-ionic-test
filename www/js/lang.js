var app = angular.module('starter');

app.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        Clinical_guide: 'Clinical Guide to',
        PROBIOTIC_SUPPLEMENTS: 'PROBIOTIC SUPPLEMENTS',
        AVAILABLE_IN_CANADA: 'AVAILABLE IN CANADA: 2014 Edition',
        Indication_Dosage: 'Indication, Dosage Forms, and Clinical Evidence to Date',
        FILTERS: 'FILTERS',
        AGE_GROUP: 'AGE GROUP',
        Please_select_age_group: 'Please select age group',
        CONDITIONS: 'CONDITIONS',
        INDICATION_FOR_ADULT_HEALTH: 'INDICATION FOR ADULT HEALTH',
        INDICATION_FOR_PEDIATRIC_HEALTH: 'INDICATION FOR PEDIATRIC HEALTH',
        INDICATION_FOR_VAGINAL_HEALTH: 'INDICATION FOR VAGINAL HEALTH',
        FUNCTIONAL_FOODS_WITH_ADDED_PROBIOTICS: 'FUNCTIONAL FOODS WITH ADDED PROBIOTICS',
        Please_select_condition: 'Please select condition',
        Adult: 'Adult',
        BUTTON_LANG_EN: 'English',
        BUTTON_LANG_FR: 'france',

        Brand_Name: "Brand Name",
        Genus_Strain: "Genus Strain",
        Dosage_Form: "Dosage Form",
        CFU_dose: "CFU/dose",
        Number_of_doses_day: "Number of doses/day",
        ID: "ID",
        AAD: "AAD",
        CDAD: "CDAD",
        CP_PP: "CP_PP",
        TD: "TD",
        C: "C",
        IBS: "IBS",
        IBD_UC: "IBD_UC",
        IBD_P: "IBD_P",
        HP: "HP",
        PD: "PD",
        LDL_C: "LDL_C",
        Regurg_GI_Mot: "Regurg_GI_Mot",
        Colic: "Colic",
        IBS_FAP: "IBS_FAP",
        CE: "CE",
        CHILDREN: "CHILDREN",
        ADULTS: "ADULTS",
        Bacterial_vaginosis: "Bacterial vaginosis",
        Vulvovaginal_candidiasis: "Vulvovaginal candidiasis",
        Probiotic_Strain: "Probiotic Strain"
    });
    $translateProvider.translations('fr', {
        Clinical_guide: 'Guide clinique',
        PROBIOTIC_SUPPLEMENTS: 'DES PROBIOTIQUES',
        AVAILABLE_IN_CANADA: 'DISPONIBLE AU CANADA : édition 2014',
        Indication_Dosage: 'Indications, préparations et données cliniques publiées à ce jour',
        FILTERS: 'LES FILTRES',
        AGE_GROUP: 'GROUPE D ÂGE',
        Please_select_age_group: 'Sélectionnez groupe d âge',
        CONDITIONS: 'CONDITIONS',
        INDICATION_FOR_ADULT_HEALTH: 'INDICATION POUR LA SANTÉ DES ADULTES',
        INDICATION_FOR_PEDIATRIC_HEALTH: 'INDICATION DE SANTÉ pédiatrique',
        INDICATION_FOR_VAGINAL_HEALTH: 'INDICATION DE LA SANTÉ VAGINALE',
        FUNCTIONAL_FOODS_WITH_ADDED_PROBIOTICS: 'ALIMENTS FONCTIONNELS AVEC probiotiques ajoutés',
        Please_select_condition: 'Veuillez sélectionner la condition',
        Adult: 'AdultFFF',
        BUTTON_LANG_EN: 'Englisch',
        BUTTON_LANG_FR: 'Franzoesisch',


        Brand_Name: "Marque Genre/Souche de commerce",
        Genus_Strain: "Genre/Souche",
        Dosage_Form: "Préparation",
        CFU_dose: "Dose/UFC",
        Number_of_doses_day: "N de doses par jour",
        ID: "DI",
        AAD: "DAA",
        CDAD: "DACD",
        CP_PP: "CD-PP",
        TD: "DV",
        C: "C",
        IBS: "SCI",
        IBD_UC: "CU",
        IBD_P: "MICI-P",
        HP: "HP",
        PD: "MP",
        LDL_C: "LDL_C",
        Regurg_GI_Mot: "Regurg/Mot intestinal",
        Colic: "Coliques",
        IBS_FAP: "SCI/DAF",
        CE: "EI",
        CHILDREN: "ENFANTS",
        ADULTS: "ADULTES",
        Bacterial_vaginosis: "Bacterial vaginosis",
        Vulvovaginal_candidiasis: "Vaginose bactérienne",
        Probiotic_Strain: "Souche(s) de probiotiques"
    });
    $translateProvider.preferredLanguage('en');
});

app.controller('LangCtrl', function ($scope, $translate) {
    $scope.changeLanguage = function (key) {
        $translate.use(key);
    };
});
