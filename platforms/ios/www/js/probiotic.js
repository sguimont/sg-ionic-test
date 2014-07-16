angular.module('starter')
    .controller('ProbioticCtrl', function ($scope, $http, $translate) {

    $scope.changeLanguage = function (key) {
        $translate.use(key);
        $scope.currentLang = $translate.use()
    };

    $scope.getCurrentLanguage = function () {
        return $translate.preferredLanguage();
    };

    $scope.ageGroups = [
        { "value": "adult", "text": "Adult"},
        { "value": "children", "text": "Children"},
        { "value": "women", "text": "Women"}
    ];


    $scope.activities = [
        { "value": "ID", "text": "ID - Infections diarrhea" },
        { "value": "AAD", "text": "ADD - Antibiotic associated diarrhea - Prevention" },
        { "value": "CDAD", "text": "CDAD - Clostridium Difficile associtaed diarreha - Prevention" },
        { "value": "CD_PP", "text": "CDAD_PP-Clostridium Difficile associtaed diarreha - Primary Prevention" },
        { "value": "TD", "text": "TD - Traveler’s diarrhea" },
        { "value": "C", "text": "C - Constipation" },
        { "value": "RE", "text": "RE - Reduces regurgitation/Improves gastrointestinal motility" },
        { "value": "HP", "text": "HP - Heliobacter pylori - Adjunct to standard eradication therapy" },
        { "value": "IBS", "text": "IBS - Irritable bowel syndrome" },
        { "value": "IBD_P", "text": "IBD_P - Inflammatory bowel disease - Pouchitis" },
        { "value": "IBD_UC", "text": "IBD - Ulcerative colitis - Adjunct to standard therapy" },
        { "value": "FAP", "text": "IBD_UC - Functional abdominal pain" },
        { "value": "CID", "text": "CID - Common infectious disease (children)" },
        { "value": "CE", "text": "CE - Childhood eczema" },
        { "value": "PD", "text": "PD - Periodontal disease" },
        { "value": "LDL_C", "text": "LDL_C - Reduction of LDL and total cholesterol" }
    ];

    $scope.ageGroupsFR = [
        { "value": "adult", "text": "Adulte"},
        { "value": "children", "text": "Les enfants"},
        { "value": "women", "text": "Les femmes"}
    ];


    $scope.activitiesFR = [
        { "value": "ID", "text": "DI - Diarrhée Infections" },
        { "value": "AAD", "text": "DAA - Diarrhée associée aux antibiotiques - Prévention" },
        { "value": "CDAD", "text": "DACD - Diarrhée associée au Clostridium difficile - Prévention" },
        { "value": "CD_PP", "text": "DACD-PP - Diarrhée associée au Clostridium difficile - Prévention primaire" },
        { "value": "TD", "text": "DV - Diarrhée du voyageur" },
        { "value": "C", "text": "C- Constipation" },
        { "value": "RE", "text": "RE - Réduit la régurgitation/ améliore la motilité gastrointestinale (constipation)" },
        { "value": "HP", "text": "HP - Heliobacter pylori – Comme complément au traitement d’éradication standard" },
        { "value": "IBS", "text": "SCI - Syndrome du côlon irritable" },
        { "value": "IBD_P", "text": "MICI-P - Maladies inflammatoires chroniques de l’intestin (pochite)" },
        { "value": "IBD_UC", "text": "CU - MII - Colite ulcéreuse – comme complément à la thérapie standa" },
        { "value": "FAP", "text": "DAF - Douleur abdominale fonctionnelle" },
        { "value": "CID", "text": "MIC - Maladies infectieuses courantes (chez les enfants)" },
        { "value": "CE", "text": "EI - Eczéma infantile" },
        { "value": "PD", "text": "MP - Maladie parodonta" },
        { "value": "LDL_C", "text": "LDL_C - Réduction des LDL et du cholestérol total" }
    ];


    $scope.findSelectedData = function () {
        var condition = $scope.condition;
        var ageGroup = $scope.ageGroup;


        console.log("------------condition----------" + condition);
        console.log("------------ageGroup----------" + ageGroup);

        var currentLang = $scope.currentLang;

        var adultsHealthUrl = "";
        var functionalFoodsUrl = "";
        var pediatricHealthUrl = "";
        var vaginalHealthUrl = "";

        if (currentLang == 'fr') {
            adultsHealthUrl = "json/adultsHealthFR.json";
            functionalFoodsUrl = "json/functionalFoodsFR.json";
            pediatricHealthUrl = "json/pediatricHealthFR.json";
            vaginalHealthUrl = "json/vaginalHealthFR.jsonFR";
        } else {
            adultsHealthUrl = "json/adultsHealth.json";
            functionalFoodsUrl = "json/functionalFoods.json";
            pediatricHealthUrl = "json/pediatricHealth.json";
            vaginalHealthUrl = "json/vaginalHealth.json";
        }


        if (ageGroup == 'adult') {
            if (condition == 'ALL') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = data;
                });
                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = []; // response data
                });
                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = []; // response data
                });
                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = data; // response data
                });
            }
            else if (condition == 'AAD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.AAD != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.AAD_ADULT != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'ID') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.ID != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.ID != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'CDAD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CDAD != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CDAD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'CP_PP') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CP_PP != '') {

                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CP_PP != '') {

                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'TD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.TD != '') {

                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.TD != '') {

                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'C') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.C != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.C != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBS') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBS != '') {

                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBS != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBD_UC') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_UC != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_UC != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBD_P') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_P != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_P != '') {

                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'HP') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.HP != '') {

                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.HP_ADULT != '') {

                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'PD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.PD != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.PD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'LDL_C') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.LDL_C != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];

                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.LDL_C != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = data;
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = data; // response data
                });


                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = []; // response data
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = []; // response data
                });
            }
        }


        else if (ageGroup == 'children') {
            if (condition == 'ALL') {
                console.log("---------------all----------");
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = []; // response data
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = []; // response data
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = data; // response data
                });


            }
            else if (condition == 'AAD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.AAD_CHILDREN != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'ID') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.ID != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'CDAD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CDAD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'CP_PP') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CP_PP != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'TD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.TD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'C') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.C != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBS') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBS != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBD_UC') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_UC != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBD_P') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_P != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'HP') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.HP_ADULT != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'PD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.PD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'LDL_C') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.LDL_C != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = data; // response data
                });


                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = []; // response data
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = []; // response data
                });
            }
        }


        else if (ageGroup == 'women') {
            if (condition == 'ALL') {
                console.log("---------------all----------");
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = []; // response data
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = data; // response data
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = []; // response data
                });


            }
            else if (condition == 'AAD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.AAD != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'ID') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = [];
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.ID != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'CDAD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CDAD != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'CP_PP') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CP_PP != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'TD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.TD != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'C') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.C != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'IBS') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBS != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'IBD_UC') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_UC != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'IBD_P') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_P != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'HP') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.HP != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'PD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.PD != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }
            else if (condition == 'LDL_C') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.LDL_C != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                });
            }

            else {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = [];
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = []; // response data
                });


                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = []; // response data
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = data; // response data
                });
            }
        }
        else {
            if (condition == 'ALL') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = data;
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = data; // response data
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = data; // response data
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = data; // response data
                });


            }
            else if (condition == 'AAD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.AAD != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.AAD != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.AAD != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.AAD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'ID') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.ID != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.ID != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.ID != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.ID != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'CDAD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CDAD != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CDAD != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CDAD != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CDAD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'CP_PP') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CP_PP != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CP_PP != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CP_PP != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.CP_PP != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'TD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.TD != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.TD != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.TD != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.TD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'C') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.C != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.C != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.C != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.C != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBS') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBS != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBS != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBS != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBS != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBD_UC') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_UC != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_UC != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_UC != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_UC != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'IBD_P') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_P != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_P != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_P != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.IBD_P != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'HP') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.HP != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.HP != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.HP != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.HP != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'PD') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.PD != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.PD != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.PD != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });


                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.PD != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else if (condition == 'LDL_C') {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts = [];
                    angular.forEach(data, function (value, key) {
                        if (value.LDL_C != '') {
                            $scope.posts.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts1 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.LDL_C != '') {
                            $scope.posts1.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts2 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.LDL_C != '') {
                            $scope.posts2.push(data[key]);
                        }
                    });
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    console.log(data)
                    $scope.posts3 = [];
                    angular.forEach(data, function (value, key) {
                        if (value.LDL_C != '') {
                            $scope.posts3.push(data[key]);
                        }
                    });
                });
            }
            else {
                $http({method: 'GET', url: adultsHealthUrl}).success(function (data) {
                    $scope.posts = data;
                });

                $http({method: 'GET', url: pediatricHealthUrl}).success(function (data) {
                    $scope.posts1 = data; // response data
                });

                $http({method: 'GET', url: vaginalHealthUrl}).success(function (data) {
                    $scope.posts2 = data; // response data
                });

                $http({method: 'GET', url: functionalFoodsUrl}).success(function (data) {
                    $scope.posts3 = data; // response data
                });
            }
        }
    };

        $scope.findSelectedDataForFr = function () {
        var conditionFR = $scope.conditionFR
        var ageGroupFR = $scope.ageGroupFR
    }

    $scope.findSelectedData('ALL', 'ALL');
});
