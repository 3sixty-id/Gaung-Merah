var runtime = null;
var currentQuizData = quizData;
var currentGameTick = null;
var queryURL = null;

//quiz params
var quizTheme = "60";
var quizPoint = 0;
var questionIndex = 0;
var currentTimer = 0;
var currentContentIndex = 0;
var currentPointRewardPerSecond = 0;
var currentCorrectAnswer = 0;
var questionCount = 0;
var currentQuestion = null;
let isGameplayPaused = false;
let isGameplayStarted = false;

var cal = null;
var isCalenderOpen = false;
var isAgreementChecked = false;

let playerName = "";
let playerUsia = "";
let playerPekerjaan = "";
let playerBrandRokok = "";
let playerKota = "";

let Tips = [];

const constructMaster = () => {
    return {
        initAction: (key, value) => {
            console.log(key + ":" + value);
            if (key == "runtime") {
                runtime = value;
            } else if (key == "button") {
                buttonHandler(value);
            } else if (key == "init") {
                initHandler(value);
            }
        },
    };
};

function buttonHandler(value) {
    switch (value) {
        case "visit":
            openInstagram();
            break;
        case "underage":
            underAgeTracker();
            break;
        case "user_agreement_true":
            initUtilities();
            break;
        case "registration":
            regisValidation();
            break;
        case "game_start":
            runtime.callFunction("closeUI", "opening_screen");
            initGameQuiz();
            break;
        case "merchandise":
            localStorage.setItem("reload_game", "1");
            setTimeout(() => {
                const params = new URLSearchParams(window.location.search);
                const event_id = params.get("event_id");

                // Redirect to main page with the same event_id
                if (event_id) {
                    window.location.href = `/?event_id=${encodeURIComponent(
                        event_id
                    )}`;
                } else {
                    window.location.href = "/";
                }
            }, 200);
            break;
        case "option_0":
            if (currentCorrectAnswer == 0) {
                runtime.callFunction("spawnConfetti");
                runtime.callFunction("audioCorrectAnswer");
                stopGameTick();
                setTimeout(() => {
                    nextQuestion();
                }, 100);
            } else {
                setTimeout(() => {
                    runtime.callFunction("audioIncorrectAnswer");
                    if (currentContentIndex < 2) {
                        runtime.callFunction(
                            "showUI",
                            "gameplay_popup_wrong_text"
                        );
                    } else {
                        runtime.callFunction(
                            "showUI",
                            "gameplay_popup_wrong_image"
                        );
                    }
                    runtime.callFunction("audioPopup");
                }, 500);
                currentTimer = 0;
                stopGameTick();
            }
            break;
        case "option_1":
            if (currentCorrectAnswer == 1) {
                runtime.callFunction("spawnConfetti");
                runtime.callFunction("audioCorrectAnswer");
                stopGameTick();
                setTimeout(() => {
                    nextQuestion();
                }, 1000);
            } else {
                setTimeout(() => {
                    runtime.callFunction("audioIncorrectAnswer");
                    if (currentContentIndex < 2) {
                        runtime.callFunction(
                            "showUI",
                            "gameplay_popup_wrong_text"
                        );
                    } else {
                        runtime.callFunction(
                            "showUI",
                            "gameplay_popup_wrong_image"
                        );
                    }
                    runtime.callFunction("audioPopup");
                }, 500);
                currentTimer = 0;
                stopGameTick();
            }
            break;
        case "option_2":
            if (currentCorrectAnswer == 2) {
                runtime.callFunction("spawnConfetti");
                runtime.callFunction("audioCorrectAnswer");
                stopGameTick();
                setTimeout(() => {
                    nextQuestion();
                }, 1000);
            } else {
                setTimeout(() => {
                    runtime.callFunction("audioIncorrectAnswer");
                    if (currentContentIndex < 2) {
                        runtime.callFunction(
                            "showUI",
                            "gameplay_popup_wrong_text"
                        );
                    } else {
                        runtime.callFunction(
                            "showUI",
                            "gameplay_popup_wrong_image"
                        );
                    }
                    runtime.callFunction("audioPopup");
                }, 500);
                currentTimer = 0;
                stopGameTick();
            }
            break;
        case "option_3":
            if (currentCorrectAnswer == 3) {
                runtime.callFunction("spawnConfetti");
                runtime.callFunction("audioCorrectAnswer");
                stopGameTick();
                setTimeout(() => {
                    nextQuestion();
                }, 1000);
            } else {
                setTimeout(() => {
                    runtime.callFunction("audioIncorrectAnswer");
                    if (currentContentIndex < 2) {
                        runtime.callFunction(
                            "showUI",
                            "gameplay_popup_wrong_text"
                        );
                    } else {
                        runtime.callFunction(
                            "showUI",
                            "gameplay_popup_wrong_image"
                        );
                    }
                    runtime.callFunction("audioPopup");
                }, 500);
                currentTimer = 0;
                stopGameTick();
            }
            break;
        case "close_popup":
            runtime.callFunction("closeUI", "gameplay_popup_wrong_text");
            runtime.callFunction("closeUI", "gameplay_popup_wrong_image");
            runtime.callFunction("closeUI", "gameplay_ui");
            runtime.callFunction("closeUI", "gameplay_0");
            runtime.callFunction("closeUI", "gameplay_1");
            runtime.callFunction("closeUI", "gameplay_2");
            if (isGameplayStarted) {
                nextQuestion();
            }
            break;
        case "game_selesai":
            localStorage.setItem("reload_game", "1");
            setTimeout(() => {
                const params = new URLSearchParams(window.location.search);
                const event_id = params.get("event_id");

                // Redirect to main page with the same event_id
                if (event_id) {
                    window.location.href = `/?event_id=${encodeURIComponent(
                        event_id
                    )}`;
                } else {
                    window.location.href = "/";
                }
            }, 1000);
            break;
        case "game_mainlagi":
            //runtime.callFunction("closeUI", "merchandise_screen");
            //fetchQuizData("profile_screen");
            break;
        case "skip_ads":
            goToTips();
            break;
        case "show_clue":
            isGameplayPaused = true;
            break;
        case "close_clue":
            isGameplayPaused = false;
            break;
    }
}

function goToTips() {
    runtime.callFunction("showUI", "processing_result");

    //  startShowTips(
    //      quizTheme,
    //      (message) => {
    //          if (message == "complete") {
    //              runtime.callFunction("closeUI", "processing_result");
    //              runtime.callFunction("spawnFinish");
    //          } else {
    //              runtime.callFunction("setTips", message);
    //          }
    //      },
    //      (progressTip) => {
    //          runtime.callFunction("setLoadingProcess", progressTip);
    //      }
    //  );

    startShowTipsCustomData(
        Tips,
        (message) => {
            if (message == "complete") {
                runtime.callFunction("closeUI", "processing_result");
                runtime.callFunction("spawnFinish");
            } else {
                runtime.callFunction("setTips", message);
            }
        },
        (progressTip) => {
            runtime.callFunction("setLoadingProcess", progressTip);
        }
    );
}

function initHandler(value) {
    if (value == "menu") {
        runtime.callFunction("showUI", "processing_screen");
        runtime.callFunction("setProcess", "Memuat halaman...");

        fetchQuizData("idle_screen");

        const usiaOptions = [
            "21-24 TAHUN",
            "25-34 TAHUN",
            "35-44 TAHUN",
            ">45 TAHUN",
        ];

        const jobOptions = [
            "KARYAWAN SWASTA",
            "WIRASWASTA / PEMILIK TOKO",
            "PEGAWAI NEGRI / BUMN",
            "PEKERJA / BURUH KONSTRUKSI",
            "PEKERJA LUAR RUANGAN (CONTOH: OJOL/DELIVERY)",
            "PELAJAR/MAHASISWA",
            "PEKERJA TERAMPIL (TUKANG KAYU, MEKANIK, TUKANG JAHIT)",
            "PETANI/NELAYAN/PETERNAK",
            "PEKERJA PABRIK",
            "LAINNYA",
        ];

        const brandOptions = [
            "DJI SAM SOE",
            "SAMPOERNA A HIJAU",
            "DJARUM COKLAT",
            "DJARUM 76",
            "SURYA",
            "SAMPOERNA A MILD",
            "GUDANG GARAM SIGNATURE",
            "GUDANG GARAM INTERNATIONAL FILTER",
            "DJARUM SUPER",
            "GUDANG GARAM MERAH",
            "SAMPOERNA A PRIMA",
            "MARLBORO",
            "MARLBORO FILTER BLACK",
            "MAGNUM",
            "LAINNYA",
        ];

        const cityOptions = [
            "AO TEGAL",
            "AO CIREBON",
            "AO JAKARTA1",
            "AO MAKASSAR",
            "AO MEDAN",
            "AO KARAWANG",
            "AO LHOKSEUMAWE",
            "AO BANDA ACEH",
            "AO BOGOR",
            "AO BANDUNG",
            "AO PEMATANG SIANTAR",
            "AO TANGERANG",
            "AO PEKANBARU",
            "AO PALU",
            "AO PARE-PARE",
            "AO SOLO",
            "AO PURWOKERTO",
            "AO MAGELANG",
            "AO PATI",
            "AO SEMARANG",
            "AO AMBON",
            "AO KENDARI",
            "AO YOGYAKARTA",
            "AO SERANG",
            "AO PADANG SIDEMPUAN",
            "AO BEKASI",
            "AO LAMPUNG",
            "AO MALANG",
            "JEMBER",
            "AO SUKABUMI",
            "AO KEDIRI",
        ];

        initDropdown("usia", "dropdown_usia", usiaOptions);
        initDropdown("job", "dropdown_pekerjaan", jobOptions);
        initDropdown("brandrokok", "dropdown_merekrokok", brandOptions);

        getCityOptions((cities) => {
            initDropdownWithSearch("kota", "dropdown_kota", cities);
        });
    }
}

function initTheme(themeId) {
    runtime.callFunction("audioBGMGeneral", "70");
    if (themeId == "60") {
        runtime.callFunction("setTheme", 0);
    } else if (themeId == "70") {
        runtime.callFunction("setTheme", 1);
    } else if (themeId == "80") {
        runtime.callFunction("setTheme", 2);
    } else if (themeId == "90") {
        runtime.callFunction("setTheme", 3);
    } else if (themeId == "2000") {
        runtime.callFunction("setTheme", 4);
    }

    quizTheme = themeId;
}

function fetchQuizData(target_visual) {
    queryURL = getQueryParams(window.location.href);
    if (queryURL == null) {
        runtime.callFunction("setProcess", "URL not valid!");
        return;
    }

    runtime.callFunction("showUI", "processing_screen");
    runtime.callFunction("setProcess", "Loading Quiz Data...");

    loadQuizData(queryURL.event_id, (status, result) => {
        console.log("SATTT" + status);
        if (status) {
            currentQuizData = JSON.parse(result);
            console.warn("QUIZ DATA");

            const staticFoodQuestion = [
                {
                    contentIndex: 0,
                    quizClueImage: "",
                    quizClueText: "",
                    quizCorrectOption: 2,
                    quizImage:
                        "/games/gaungmerah/images/questions/static_food_1.jpg",
                    quizOptions: [
                        "Martabak Mesir",
                        "Rendang",
                        "Gulai Ikan",
                        "Pempek",
                    ],
                    quizQuestion:
                        "Makanan khas Sumatra Barat yang telah diakui sebagai salah satu makanan terenak di dunia adalah…",
                    quizReason: "",
                    quizSettingTimer: { timer: 10, pointSecond: 1 },
                    tagImage: 1,
                },
                {
                    contentIndex: 0,
                    quizClueImage: "",
                    quizClueText: "",
                    quizCorrectOption: 3,
                    quizImage:
                        "/games/gaungmerah/images/questions/static_food_2.jpg",
                    quizOptions: [
                        "Sulawesi Selatan",
                        "Nusa Tenggara Barat",
                        "Aceh",
                        "Jawa Barat",
                    ],
                    quizQuestion:
                        "Kopi Gayo merupakan Salah Satu Jenis Kopi Terbaik di Dunia yang diakui dari waktu ke waktu berasal dari provinsi….",
                    quizReason: "",
                    quizSettingTimer: { timer: 10, pointSecond: 1 },
                    tagImage: 1,
                },
                {
                    contentIndex: 0,
                    quizClueImage: "",
                    quizClueText: "",
                    quizCorrectOption: 1,
                    quizImage:
                        "/games/gaungmerah/images/questions/static_food_3.jpg",
                    quizOptions: ["Durian", "Manggis", "Salak", "Lontar"],
                    quizQuestion:
                        "Buah terkenal dari Medan yang kenikmatannya diakui dari waktu ke waktu dan sering dijuluki sebagai “The King of Fruit” adalah…",
                    quizReason: "",
                    quizSettingTimer: { timer: 10, pointSecond: 1 },
                    tagImage: 1,
                },
                {
                    contentIndex: 0,
                    quizClueImage: "",
                    quizClueText: "",
                    quizCorrectOption: 4,
                    quizImage:
                        "/games/gaungmerah/images/questions/static_food_4.jpg",
                    quizOptions: [
                        "Es Teler",
                        "Sop Buah",
                        "Es Cendol",
                        "Es Pisang Ijo",
                    ],
                    quizQuestion:
                        "Kuliner Manis Khas Makassar (Sulawesi Selatan) yang bahan utamanya adalah pisang yang dibalut dengan adonan hijau adalah",
                    quizReason: "",
                    quizSettingTimer: { timer: 10, pointSecond: 1 },
                    tagImage: 1,
                },
                {
                    contentIndex: 0,
                    quizClueImage: "",
                    quizClueText: "",
                    quizCorrectOption: 1,
                    quizImage:
                        "/games/gaungmerah/images/questions/static_food_5.jpg",
                    quizOptions: [
                        "Warteg",
                        "Warung Padang",
                        "Angkringan",
                        "Food Court",
                    ],
                    quizQuestion:
                        "Warung makan khas Tegal yang kualitasnya menyala dari waktu ke waktu adalah",
                    quizReason: "",
                    quizSettingTimer: { timer: 10, pointSecond: 1 },
                    tagImage: 1,
                },
            ];

            const staticQuestions = [
                {
                    contentIndex: 0,
                    quizClueImage: "",
                    quizClueText: "",
                    quizCorrectOption: 2,
                    quizImage: "",
                    quizOptions: [
                        "Gaung Merah Selamanya",
                        "Gaung Merah SeGALAnya",
                        "Gaung Irama",
                        "Irama Merah",
                    ],
                    quizQuestion:
                        "Apa nama Acara Musik everlasting yang diadakan oleh Gaung Merah?",
                    quizReason: "",
                    quizSettingTimer: { timer: 10, pointSecond: 1 },
                    tagImage: 0,
                },
                {
                    contentIndex: 0,
                    quizClueImage: "",
                    quizClueText: "",
                    quizCorrectOption: 3,
                    quizImage:
                        "/games/gaungmerah/images/questions/static_question_2.jpg",
                    quizOptions: ["Iwa K", "Slank", "Iwan Fals", "Tipe-X"],
                    quizQuestion:
                        "Siapa Musisi Everlasting yang dibawa oleh Gaung Merah ke 35 Kota di Indonesia?",
                    quizReason: "",
                    quizSettingTimer: { timer: 10, pointSecond: 1 },
                    tagImage: 1,
                },
                {
                    contentIndex: 0,
                    quizClueImage: "",
                    quizClueText: "",
                    quizCorrectOption: 1,
                    quizImage: "",
                    quizOptions: [
                        "Musik, Film, Kuliner",
                        "Fashion, Seni, Film",
                        "Film, Arsitektur, Kuliner",
                        "Kuliner, Otomotif, Hobby",
                    ],
                    quizQuestion: "Apa 3 pilar dari Gaung Merah?",
                    quizReason: "",
                    quizSettingTimer: { timer: 10, pointSecond: 1 },
                    tagImage: 0,
                },
            ];

            currentQuizData.questions = currentQuizData.questions.slice(0, 6);

            // currentQuizData.questions = [];

            const randomIndex = Math.floor(
                Math.random() * staticFoodQuestion.length
            );
            currentQuizData.questions.push(staticFoodQuestion[randomIndex]);

            staticQuestions.forEach((q, index) => {
                console.log(`Question ${index + 1}: ${q.quizQuestion}`);
                console.log("Options:", q.quizOptions);
                console.log("Correct Option Index:", q.quizCorrectOption);

                currentQuizData.questions.push(q);
            });

            setTimeout(() => {
                currentQuizData.questions.forEach((q, index) => {
                    //Tips
                    if (q.quizReason.length > 0) {
                        Tips.push(q.quizReason);
                    }
                });

                if (Tips.length < 1) {
                    Tips = tips["70"];
                }

                console.warn("CLUIE TIPS");
                console.log(Tips);
            }, 1000);

            console.log(currentQuizData.questions);

            initTheme(currentQuizData.theme);

            questionCount = currentQuizData.questions.length;
            currentQuestion = currentQuizData.questions[questionIndex];

            initMerchList();

            setTimeout(() => {
                runtime.callFunction("closeUI", "processing_screen");

                var reloadStatus = localStorage.getItem("reload_game");
                if (reloadStatus === "1") {
                    const userState = localStorage.getItem("user_state");
                    const userStateProfile = JSON.parse(userState);

                    playerName = userStateProfile.nama_lengkap;
                    playerUsia = userStateProfile.usia;
                    playerPekerjaan = userStateProfile.pekerjaan;
                    playerBrandRokok = userStateProfile.merk_rokok;
                    playerKota = userStateProfile.kota_domisili;

                    runtime.callFunction("setNickname", playerName);
                    runtime.callFunction(
                        "setProfileMessage",
                        "Permainan ini memuat pertanyaaan-pertanyaan terkait musik, film dan kuliner legendaris. Anda akan diminta untuk menjawab dan mengumpulkan poin."
                    );

                    isGameplayStarted = true;

                    runtime.callFunction("closeUI", "idle_screen");
                    runtime.callFunction("showUI", "profile_screen");
                } else {
                    runtime.callFunction("showUI", target_visual);
                }

                localStorage.setItem("reload_game", "0");
            }, 1000);
        } else {
            runtime.callFunction(
                "setProcess",
                "Terjadi kesalahan pada Server!"
            );
        }
    });
}

function initMerchList() {
    const merchData = currentQuizData.merchandise;

    var merchImage_1 = "";
    var merchName_1 = "";
    var merchPointRange_1 = "";

    var merchImage_2 = "";
    var merchName_2 = "";
    var merchPointRange_2 = "";

    var merchImage_3 = "";
    var merchName_3 = "";
    var merchPointRange_3 = "";

    var merchImage_4 = "";
    var merchName_4 = "";
    var merchPointRange_4 = "";

    var index = 1;
    for (const element of merchData) {
        if (index < 5) {
            if (index == 1) {
                merchImage_1 = element.image;
                merchName_1 = element.merch_name;
                merchPointRange_1 = `${element.minPoint} ~ ${element.maxPoint} Poin`;
            } else if (index == 2) {
                merchImage_2 = element.image;
                merchName_2 = element.merch_name;
                merchPointRange_2 = `${element.minPoint} ~ ${element.maxPoint} Poin`;
            } else if (index == 3) {
                merchImage_3 = element.image;
                merchName_3 = element.merch_name;
                merchPointRange_3 = `${element.minPoint} ~ ${element.maxPoint} Poin`;
            } else if (index == 4) {
                merchImage_4 = element.image;
                merchName_4 = element.merch_name;
                merchPointRange_4 = `${element.minPoint} ~ ${element.maxPoint} Poin`;
            }
        }
        index++;
    }

    runtime.callFunction(
        "setMerchPreview",
        merchImage_1,
        merchName_1,
        merchPointRange_1,
        merchImage_2,
        merchName_2,
        merchPointRange_2,
        merchImage_3,
        merchName_3,
        merchPointRange_3,
        merchImage_4,
        merchName_4,
        merchPointRange_4
    );
}

function initGameQuiz() {
    currentQuestion = currentQuizData.questions[questionIndex];
    let contentIndex = parseInt(currentQuestion.contentIndex);
    // let contentIndex = 1;
    let quizCorrectOption = parseInt(currentQuestion.quizCorrectOption);

    console.log(currentQuestion);

    runtime.callFunction(
        "setQuizContent",
        contentIndex,
        currentQuestion.quizImage == null ? "" : currentQuestion.quizImage,
        currentQuestion.quizQuestion == null
            ? "Question Not Define"
            : currentQuestion.quizQuestion
    );

    var optionA = !currentQuestion.quizOptions[0].includes("http")
        ? "A. " + currentQuestion.quizOptions[0]
        : currentQuestion.quizOptions[0];
    var optionB = !currentQuestion.quizOptions[1].includes("http")
        ? "B. " + currentQuestion.quizOptions[1]
        : currentQuestion.quizOptions[1];
    var optionC = !currentQuestion.quizOptions[2].includes("http")
        ? "C. " + currentQuestion.quizOptions[2]
        : currentQuestion.quizOptions[2];
    var optionD = !currentQuestion.quizOptions[3].includes("http")
        ? "D. " + currentQuestion.quizOptions[3]
        : currentQuestion.quizOptions[3];

    runtime.callFunction(
        "setGameplay",
        contentIndex,
        optionA,
        optionB,
        optionC,
        optionD,
        currentQuestion.quizClueText == null
            ? ""
            : currentQuestion.quizClueText,
        currentQuestion.quizClueImage == null
            ? ""
            : currentQuestion.quizClueImage
    );

    currentContentIndex = contentIndex;
    currentCorrectAnswer = quizCorrectOption - 1; //backen support from index 1

    runtime.callFunction("setQuizTimer", 10 + "s");

    startGameTick(currentQuestion.quizSettingTimer);

    if (currentContentIndex < 2) {
        runtime.callFunction(
            "setCorrectAnswer",
            currentQuestion.quizOptions[currentCorrectAnswer]
        );
    }

    if (currentContentIndex == 2) {
        runtime.callFunction(
            "setCorrectAnswerImage",
            currentQuestion.quizOptions[currentCorrectAnswer]
        );
    }

    if (
        currentQuestion.quizReason == null ||
        currentQuestion.quizReason == ""
    ) {
        runtime.callFunction("setReasonAnswer", "");
    } else {
        runtime.callFunction("setReasonAnswer", currentQuestion.quizReason);
    }

    runtime.callFunction("closeUI", "processing_screen");

    runtime.callFunction("closeUI", "gameplay_clue");
    runtime.callFunction("closeUI", "gameplay_ui");
    runtime.callFunction("closeUI", "gameplay_ui_noimage");
    runtime.callFunction("closeUI", "gameplay_0");
    runtime.callFunction("closeUI", "gameplay_1");
    runtime.callFunction("closeUI", "gameplay_2");
    runtime.callFunction("closeUI", "gameplay_0_noimage");
    runtime.callFunction("closeUI", "gameplay_1_noimage");
    runtime.callFunction("closeUI", "gameplay_2_noimage");

    if (currentQuestion.tagImage == "0") {
        runtime.callFunction("showUI", "gameplay_ui_noimage");
        runtime.callFunction(
            "showUI",
            "gameplay_" + currentQuestion.contentIndex + "_noimage"
        );
    } else {
        runtime.callFunction("showUI", "gameplay_ui");
        runtime.callFunction(
            "showUI",
            "gameplay_" + currentQuestion.contentIndex
        );
    }
}

function nextQuestion() {
    questionIndex++;

    const quizProgress = questionIndex / questionCount;
    runtime.callFunction("setQuizProgress", quizProgress);

    if (questionIndex < questionCount) {
        runtime.callFunction("showUI", "processing_screen");
        runtime.callFunction("setProcess", "Memuat Pertanyaan Selanjutnya...");
        setTimeout(() => {
            initGameQuiz();
        }, 1000);
    } else {
        runtime.callFunction("setScore", quizPoint + "");
        runtime.callFunction("showUI", "processing_screen");
        runtime.callFunction("setProcess", "Menyelesaikan Quiz...");
        setTimeout(() => {
            calculateResult();
            runtime.callFunction("closeUI", "gameplay_clue");
            runtime.callFunction("closeUI", "gameplay_ui");
            runtime.callFunction("closeUI", "gameplay_ui_noimage");
            runtime.callFunction("closeUI", "gameplay_0");
            runtime.callFunction("closeUI", "gameplay_1");
            runtime.callFunction("closeUI", "gameplay_2");
            runtime.callFunction("closeUI", "gameplay_0_noimage");
            runtime.callFunction("closeUI", "gameplay_1_noimage");
            runtime.callFunction("closeUI", "gameplay_2_noimage");
            runtime.callFunction("closeUI", "processing_screen");

            // runtime.callFunction("showUI", "processing_result");

            goToTips();

            // setTimeout(() => {
            //    runtime.callFunction("prepareVideo");
            //    setTimeout(() => {
            //       runtime.callFunction("playVideo");
            //       setTimeout(() => {
            //          goToTips();
            //       }, 3000);
            //    }, 1000);
            // }, 2000);
        }, 1000);
    }
}

function startGameTick(setting) {
    currentTimer = parseInt(setting.timer, 10 + 3);
    currentPointRewardPerSecond = parseInt(setting.pointSecond, 10);

    if (currentGameTick) clearInterval(currentGameTick);

    runtime.callFunction("setQuizTimer", currentTimer - 3 + "s");

    currentGameTick = setInterval(() => {
        if (isGameplayPaused) return;
        console.log(currentTimer);
        currentTimer--;
        if (currentTimer <= 10) {
            runtime.callFunction("setQuizTimer", currentTimer + "s");
        }
        if (currentTimer <= 0) {
            runtime.globalVars.IsAnswered = true;
            runtime.callFunction("closeUI", "gameplay_clue");
            runtime.callFunction("audioIncorrectAnswer");
            if (currentContentIndex < 2) {
                runtime.callFunction("showUI", "gameplay_popup_wrong_text");
            } else {
                runtime.callFunction("showUI", "gameplay_popup_wrong_image");
            }
            runtime.callFunction("audioPopup");
            stopGameTick();
        }
    }, 1000);
}

function stopGameTick() {
    if (currentGameTick) clearInterval(currentGameTick);
    quizPoint += clamp(currentTimer, 0, 10) * currentPointRewardPerSecond;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function calculateResult() {
    const merchData = currentQuizData.merchandise;
    var currentMerchId = "";
    var currentRewardURL = "";
    for (const element of merchData) {
        console.log(element);
        const minPoint = parseInt(element.minPoint);
        const maxPoint = parseInt(element.maxPoint);
        if (quizPoint >= minPoint && quizPoint <= maxPoint) {
            currentMerchId = element.merchandise_id;
            currentRewardURL = element.image;
            console.log("==========================");
            console.log("Merch Id: " + currentMerchId);
            console.log("My Score: " + quizPoint);
            console.log("==========================");
            console.log("Min Point: " + minPoint);
            console.log("Max Point: " + maxPoint);
            console.log("Merch Image: " + currentRewardURL);
            console.log("==========================");
            break;
        }
    }

    const sendData = {
        event_id: queryURL.event_id,
        nama_lengkap: playerName,
        kode_nama: playerName,
        no_telepon: "-",
        usia: playerUsia,
        pekerjaan: playerPekerjaan,
        merk_rokok: playerBrandRokok,
        kota_domisili: playerKota,
        best_score: quizPoint,
        type_quiz: quizTheme,
        merch_id: currentMerchId,
    };

    // const sendData = {
    //    event_id: queryURL.event_id,
    //    nama_lengkap: playerName,
    //    kode_nama: playerNickName,
    //    no_telepon: playerPhoneNumber,
    //    tanggal_lahir: PlayerBirthDate,
    //    type_quiz: quizTheme,
    //    best_score: quizPoint,
    //    merch_id: currentMerchId,
    // };

    storePlayerData(sendData, (status, data) => {
        console.log("Store data status: " + status);
        console.log(data);

        localStorage.setItem("user_state", JSON.stringify(sendData));

        SESSION_ID = JSON.parse(data).response.user_id;

        // saveLocalUser(playerName, playerPhoneNumber, PlayerBirthDate);
    });

    // runtime.callFunction(
    //    "setWelcomingName",
    //    `Silahkan Lanjutkan Permainan\nAyunan Sinemusika`
    // );

    // runtime.callFunction(
    //    "setWelcomingName",
    //    `Selamat!\n${playerName}\nKamu Mendapatkan:`
    // );

    runtime.callFunction("setWelcomingName", `${playerName}`);

    quizTheme = "70";
    quizPoint = 0;
    questionIndex = 0;
    currentTimer = 0;
    currentContentIndex = 0;
    currentPointRewardPerSecond = 0;
    currentCorrectAnswer = 0;
    questionCount = 0;
    currentQuestion = null;

    runtime.callFunction("setMerchandise", currentRewardURL);
}

function initUtilities() {
    const telphone = document.getElementById("telphone");
    const tanggalInput = document.getElementById("tanggal");
    const bulanInput = document.getElementById("bulan");
    const tahunInput = document.getElementById("tahun");

    telphone.maxLength = 12;

    tanggalInput.addEventListener("click", function () {
        if (isCalenderOpen) return;
        isCalenderOpen = true;
        dateInitiator.showDate((value) => {
            onDatePickerChange(value, tanggalInput);
        });
    });

    bulanInput.addEventListener("click", function () {
        if (isCalenderOpen) return;
        isCalenderOpen = true;
        dateInitiator.showMonth((value) => {
            onDatePickerChange(value, bulanInput);
        });
    });

    tahunInput.addEventListener("click", function () {
        if (isCalenderOpen) return;
        isCalenderOpen = true;
        dateInitiator.showYear((value) => {
            onDatePickerChange(value, tahunInput);
        });
    });

    document
        .getElementById("agreement")
        .addEventListener("change", function () {
            if (this.checked) {
                isAgreementChecked = true;
            } else {
                isAgreementChecked = false;
            }
        });
}

function onDatePickerChange(value, el) {
    console.log(value);
    el.value = value;
    dateInitiator.close();
    setTimeout(() => {
        isCalenderOpen = false;
    }, 200);
}

function regisValidation() {
    // if (isCalenderOpen) return;

    const fullname = document.getElementById("fullname");
    const usia = document.getElementById("usia");
    const job = document.getElementById("job");
    const brandrokok = document.getElementById("brandrokok");
    const kota = document.getElementById("kota");

    // const telphone = document.getElementById("telphone");
    // const tanggal = document.getElementById("tanggal");
    // const bulan = document.getElementById("bulan");
    // const tahun = document.getElementById("tahun");

    if (fullname.value == "" || fullname.value.length < 4) {
        runtime.callFunction("closeUI", "form_screen");
        runtime.callFunction("showUI", "form_screen_warning");
        runtime.callFunction(
            "setFormWarning",
            "Masukkan Nama minimal 4 karakter!"
        );
        runtime.callFunction("audioIncorrectAnswer");
        return;
    }

    if (usia.value == "" || Number(usia.value) < 21) {
        runtime.callFunction("closeUI", "form_screen");
        runtime.callFunction("showUI", "form_screen_warning");
        runtime.callFunction("setFormWarning", "Minimal usia adalah 21 tahun!");
        runtime.callFunction("audioIncorrectAnswer");
        return;
    }

    if (job.value == "" || job.value.length < 4) {
        runtime.callFunction("closeUI", "form_screen");
        runtime.callFunction("showUI", "form_screen_warning");
        runtime.callFunction(
            "setFormWarning",
            "Masukkan Jenis Pekerjaan minimal 4 karakter!"
        );
        runtime.callFunction("audioIncorrectAnswer");
        return;
    }

    if (brandrokok.value == "" || brandrokok.value.length < 4) {
        runtime.callFunction("closeUI", "form_screen");
        runtime.callFunction("showUI", "form_screen_warning");
        runtime.callFunction(
            "setFormWarning",
            "Masukkan Merek Rokok minimal 4 karakter!"
        );
        runtime.callFunction("audioIncorrectAnswer");
        return;
    }

    if (kota.value == "" || kota.value.length < 4) {
        runtime.callFunction("closeUI", "form_screen");
        runtime.callFunction("showUI", "form_screen_warning");
        runtime.callFunction(
            "setFormWarning",
            "Masukkan Nama Kota minimal 4 karakter!"
        );
        runtime.callFunction("audioIncorrectAnswer");
        return;
    }

    // if (!validatePhoneNumber(telphone.value)) {
    //    runtime.callFunction("closeUI", "form_screen");
    //    runtime.callFunction("showUI", "form_screen_warning");
    //    runtime.callFunction("setFormWarning", "Periksa kembali nomor telphone!");
    //    runtime.callFunction("audioIncorrectAnswer");
    //    return;
    // }

    // if (tanggal.value == "" || bulan.value == "" || tahun.value == "") {
    //    runtime.callFunction("closeUI", "form_screen");
    //    runtime.callFunction("showUI", "form_screen_warning");
    //    runtime.callFunction(
    //       "setFormWarning",
    //       "Lengkapi tanggal bulan dan tahun lahir!"
    //    );
    //    runtime.callFunction("audioIncorrectAnswer");
    //    return;
    // }

    // const birthDate = `${tahun.value}-${getMonthInNumber(bulan.value)}-${
    //    tanggal.value
    // }`;
    // if (!isAtLeast18YearsOld(birthDate)) {
    //    runtime.callFunction("closeUI", "form_screen");
    //    runtime.callFunction("showUI", "form_screen_warning");
    //    runtime.callFunction(
    //       "setFormWarning",
    //       "Anda harus berusia 21 tahun keatas untuk dapat melakukan registrasi!"
    //    );
    //    runtime.callFunction("audioIncorrectAnswer");
    //    return;
    // }

    if (!isAgreementChecked) {
        runtime.callFunction("closeUI", "form_screen");
        runtime.callFunction("showUI", "form_screen_warning");
        runtime.callFunction(
            "setFormWarning",
            "Centang Syarat dan Ketentuan Untuk Melanjutkan!"
        );
        runtime.callFunction("audioIncorrectAnswer");
        return;
    }

    playerName = fullname.value;
    playerUsia = usia.value;
    playerPekerjaan = job.value;
    playerBrandRokok = brandrokok.value;
    playerKota = kota.value;

    // playerFirstName = playerName.split(" ")[0];
    // playerLastName = playerName.split(" ")[1];
    // playerPhoneNumber = telphone.value;
    // PlayerBirthDate = birthDate;

    // const userPlayStatus = checkLocalUser(
    //    playerName,
    //    playerPhoneNumber,
    //    PlayerBirthDate
    // );

    // console.log("Is Player Can Play? : " + userPlayStatus);

    // if (!userPlayStatus) {
    //    runtime.callFunction("closeUI", "form_screen");
    //    runtime.callFunction("showUI", "form_screen_warning");
    //    runtime.callFunction(
    //       "setFormWarning",
    //       "Mohon Maaf Anda Hanya Dapat Melakukan 1x Permainan Dalam 1 Hari."
    //    );
    //    runtime.callFunction("audioIncorrectAnswer");
    //    return;
    // }

    // //playerNickName = `${playerFirstName}_` + generateNickName(quizTheme);
    playerNickName = playerName;
    runtime.callFunction("setNickname", playerNickName);
    runtime.callFunction(
        "setProfileMessage",
        "Permainan ini memuat pertanyaaan-pertanyaan terkait musik, film dan kuliner legendaris. Anda akan diminta untuk menjawab dan mengumpulkan poin."
    );

    isGameplayStarted = true;

    runtime.callFunction("audioCorrectAnswer");
    runtime.callFunction("closeUI", "form_screen");
    runtime.callFunction("showUI", "intro_video");
    runtime.callFunction("playVideoIntro");
}

function validatePhoneNumber(number) {
    const phoneNumberRegex = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;
    return phoneNumberRegex.test(number);
}

function isAtLeast18YearsOld(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    const birthdate = new Date(year, month - 1, day);

    // Get the date 18 years ago from today
    const today = new Date();
    const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );

    // Check if the input date is earlier than or equal to the date 18 years ago
    if (birthdate <= eighteenYearsAgo) {
        return true;
    } else {
        return false;
    }
}

function openInstagram() {
    const url = baseURL + `/api/audience/${SESSION_ID}/klik-instagram`;

    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                console.warn("ERROR");
                console.log(response.status);
                openIG();
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.warn(SESSION_ID, " - IG SUCCESS TO TRACKED");
            openIG();
        })
        .catch((error) => {
            console.warn(SESSION_ID, " - IG FAILED TO TRACKED");
            openIG();
        });
}

function underAgeTracker() {
    const url = baseURL + `/api/log-button-click`;

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                console.warn("ERROR");
                console.log(response.status);

                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.warn("UNDERAGE TRACKED");
        })
        .catch((error) => {
            console.warn("ERROR");
            console.error(error);
        });
}

function openIG() {
    const appLink = `instagram://user?username=gaung_merah`;
    const webLink = `https://www.instagram.com/gaung_merah`;

    window.open(webLink, "_blank");
}

function initDropdown(inputId, dropdownId, optionsList) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    let ghostInput = null;

    // 1. Clear existing items and generate <li> dynamically
    dropdown.innerHTML = "";
    optionsList.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        dropdown.appendChild(li);

        li.addEventListener("click", (event) => {
            const value = option;

            if (value === "LAINNYA") {
                // 1. Hapus ghostInput sebelumnya jika ada
                if (ghostInput) ghostInput.remove();

                // 2. Buat ghost input baru yang tersembunyi
                ghostInput = document.createElement("input");
                ghostInput.type = "text";
                ghostInput.style.position = "absolute";
                ghostInput.style.opacity = "0";
                ghostInput.style.height = "0";
                ghostInput.style.width = "0";
                ghostInput.style.zIndex = "-1";
                ghostInput.autocapitalize = "off";
                ghostInput.autocomplete = "off";
                ghostInput.autocorrect = "off";

                document.body.appendChild(ghostInput);

                ghostInput.value = "";
                ghostInput.focus(); // ⌨️ trigger keyboard di iOS

                // Sync value ke input utama
                ghostInput.addEventListener("input", () => {
                    input.value = ghostInput.value;
                });

                // Bersihkan jika blur
                ghostInput.addEventListener("blur", () => {
                    ghostInput.remove();
                    ghostInput = null;
                });

                input.value = ""; // Kosongkan main input
                input.setAttribute("readonly", true); // Tetap readonly
                dropdown.style.display = "none";

                runtime.globalVars.isBussy = false;
            } else {
                input.value = value;
                input.setAttribute("readonly", true);
                dropdown.style.display = "none";

                if (ghostInput) {
                    ghostInput.remove();
                    ghostInput = null;
                }

                runtime.globalVars.isBussy = false;
            }

            event.stopPropagation();
        });
    });

    function positionDropdown() {
        const rect = input.getBoundingClientRect();
        dropdown.style.top = window.scrollY + rect.bottom + "px";
        dropdown.style.left = window.scrollX + rect.left + "px";
        dropdown.style.width = rect.width + "px";
    }

    input.addEventListener("click", () => {
        // Hide all other dropdowns before showing this one
        document.querySelectorAll("ul").forEach((ul) => {
            if (ul !== dropdown) {
                ul.style.display = "none";
            }
        });

        positionDropdown();
        dropdown.style.display = "block";
        runtime.globalVars.isBussy = true;
    });
}

function initDropdownWithSearch(inputId, dropdownId, optionsList) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);

    // Create the search box
    const searchBox = document.createElement("input");
    searchBox.id = "searchBox";
    searchBox.type = "text";
    searchBox.placeholder = "Cari kota...";
    searchBox.style.width = "100%";
    searchBox.style.boxSizing = "border-box";
    searchBox.style.marginBottom = "4px";

    dropdown.innerHTML = ""; // Clear previous content
    dropdown.appendChild(searchBox);

    const listContainer = document.createElement("div");
    dropdown.appendChild(listContainer);

    function renderList(filteredOptions) {
        listContainer.innerHTML = ""; // Clear previous list

        filteredOptions.forEach((option) => {
            const li = document.createElement("li");
            li.textContent = option;
            li.style.cursor = "pointer";
            listContainer.appendChild(li);

            li.addEventListener("click", (event) => {
                if (option === "LAINNYA") {
                    input.removeAttribute("readonly");
                    input.value = "";
                    setTimeout(() => {
                        dropdown.style.display = "none";
                        input.focus();
                    }, 50);
                    runtime.globalVars.isBussy = false;
                } else {
                    input.value = option;
                    input.setAttribute("readonly", true);
                    dropdown.style.display = "none";
                    runtime.globalVars.isBussy = false;
                }
                event.stopPropagation();
            });
        });
    }

    renderList(optionsList); // initial render

    // Filter list on search
    searchBox.addEventListener("input", () => {
        const keyword = searchBox.value.trim().toLowerCase();
        const filtered = optionsList.filter((option) =>
            option.toLowerCase().includes(keyword)
        );
        renderList(filtered);
    });

    function positionDropdown() {
        const rect = input.getBoundingClientRect();
        dropdown.style.top = window.scrollY + rect.bottom + "px";
        dropdown.style.left = window.scrollX + rect.left + "px";
        dropdown.style.width = rect.width + "px";
    }

    input.addEventListener("click", () => {
        document.querySelectorAll("ul").forEach((ul) => {
            if (ul !== dropdown) ul.style.display = "none";
        });

        positionDropdown();
        dropdown.style.display = "block";
        searchBox.value = "";
        renderList(optionsList); // Reset list on open
        searchBox.focus();
        runtime.globalVars.isBussy = true;
    });
}
