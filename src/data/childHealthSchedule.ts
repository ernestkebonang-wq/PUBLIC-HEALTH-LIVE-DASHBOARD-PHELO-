export interface VaccineMilestone {
  id: string;
  ageDueWeeks: number;
  ageDueLabelEn: string;
  ageDueLabelTn: string;
  vaccineName: string;
  preventsEn: string;
  preventsTn: string;
  routeOfAdministration: string;
  clinicalImportanceEn: string;
  clinicalImportanceTn: string;
  sideEffectsNoticeEn: string;
  sideEffectsNoticeTn: string;
}

export const BOTSWANA_EPI_SCHEDULE: VaccineMilestone[] = [
  {
    id: 'epi-birth-bcg',
    ageDueWeeks: 0,
    ageDueLabelEn: 'At Birth (Mo matsatsing a ntlha)',
    ageDueLabelTn: 'Fa ngwana a tsholwa',
    vaccineName: 'BCG + OPV 0',
    preventsEn: 'Severe Tuberculosis (Miliary TB & TB Meningitis) and Poliovirus',
    preventsTn: 'Kgotlholo e kgolo ya TB mo baneng le bolwetse jwa Polio',
    routeOfAdministration: 'Intradermal left upper arm (BCG) & oral drops (OPV 0)',
    clinicalImportanceEn: 'Administered before discharge from the maternity ward. Forms a tiny protective scar on the left arm.',
    clinicalImportanceTn: 'O kentiwa pele ga mme le ngwana ba gololwa mo sepateleng sa matsalo.',
    sideEffectsNoticeEn: 'Small red swelling that forms a crust after 2-4 weeks. Keep clean and dry; do not apply herbs or squeeze.',
    sideEffectsNoticeTn: 'Ntho e nnye e e rothang; e tlogele e le phepa o se ka wa e tlhotlha.'
  },
  {
    id: 'epi-6weeks',
    ageDueWeeks: 6,
    ageDueLabelEn: '6 Weeks (Dibeke tse 6)',
    ageDueLabelTn: 'Dibeke tse 6',
    vaccineName: 'Pentavalent 1 + PCV 1 + Rotavirus 1 + OPV 1',
    preventsEn: 'Diphtheria, Tetanus, Pertussis (Whooping cough), Hepatitis B, Hib pneumonia/meningitis, Pneumococcal disease, and severe Rotavirus diarrhoea',
    preventsTn: 'Mofikela o o borai, khunwana, sehuba se segolo, letshoroma la teng, le letshololo la rotavirus',
    routeOfAdministration: 'Two thigh injections (Penta & PCV) + oral drops (Rota & OPV)',
    clinicalImportanceEn: 'Critical foundation for immune response. Bring the child to the clinic in comfortable, loose clothing.',
    clinicalImportanceTn: 'Motheo o mogolo wa go tiisa mmele wa ngwana kgatlhanong le malwetse a a borai.',
    sideEffectsNoticeEn: 'Mild irritability or low fever for 24-48 hours. Give extra breastmilk and paracetamol drops if prescribed.',
    sideEffectsNoticeTn: 'Ngwana a ka nna le letshoromanyana la malatsi a mabedi; mo anyise gantsi.'
  },
  {
    id: 'epi-10weeks',
    ageDueWeeks: 10,
    ageDueLabelEn: '10 Weeks (Dibeke tse 10)',
    ageDueLabelTn: 'Dibeke tse 10',
    vaccineName: 'Pentavalent 2 + PCV 2 + Rotavirus 2 + OPV 2',
    preventsEn: 'Second booster dose against 7 major childhood infectious threats',
    preventsTn: 'Mokento wa bobedi wa go tiisa tshireletso ya malwetse a le 7',
    routeOfAdministration: 'Two thigh injections + oral drops',
    clinicalImportanceEn: 'Reinforces antibodies created by the 6-week immunization.',
    clinicalImportanceTn: 'O tiisa masole a mmele a a simolotseng ka dibeke tse 6.',
    sideEffectsNoticeEn: 'Mild tenderness at injection site. Use a cool, clean damp cloth.',
    sideEffectsNoticeTn: 'Botlhokonyana fa a kentsweng gone; mo bee lesela le le metsi a a tsididi.'
  },
  {
    id: 'epi-14weeks',
    ageDueWeeks: 14,
    ageDueLabelEn: '14 Weeks (Dibeke tse 14)',
    ageDueLabelTn: 'Dibeke tse 14',
    vaccineName: 'Pentavalent 3 + PCV 3 + IPV (Inactivated Polio Injection) + OPV 3',
    preventsEn: 'Full primary childhood immunization series completed against pneumonia, meningitis, tetanus, and polio',
    preventsTn: 'Go fetsa kgato ya ntlha ya ditshireletso tsa dikgofo le polio',
    routeOfAdministration: 'Three thigh injections + oral drops',
    clinicalImportanceEn: 'Final dose of the primary infant series. Completes 95%+ protection against lethal bacterial meningitis.',
    clinicalImportanceTn: 'Mokento wa bofelo wa kgato ya lesea o o sireletsang ngwana go fitlha a nna ngwaga.',
    sideEffectsNoticeEn: 'Mild swelling on thighs. Keep the child cool and comfortable.',
    sideEffectsNoticeTn: 'Ruruho e e botlhofo mo diropeng; apara ngwana diaparo tse di motlhofo.'
  },
  {
    id: 'epi-6months-vitA',
    ageDueWeeks: 26,
    ageDueLabelEn: '6 Months (Dikgwedi tse 6)',
    ageDueLabelTn: 'Dikgwedi tse 6',
    vaccineName: 'Vitamin A Drops (100,000 IU) + Nutrition / Growth Weigh-In',
    preventsEn: 'Night blindness, eye infections, and bolsters intestinal gut immunity',
    preventsTn: 'Go thibela bokoa jwa matlho le go nonotsha mpa le kgolo ya ngwana',
    routeOfAdministration: 'Oral liquid drops given by clinic nurse',
    clinicalImportanceEn: 'Milestone for introducing solid complementary foods (soft motogo, mashed beans, pumpkin) while continuing breastfeeding.',
    clinicalImportanceTn: 'Nako ya go simolola go fepa ngwana dijo tse di tiileng jaaka motogo le dinawa tse di thubilweng.',
    sideEffectsNoticeEn: 'Zero notable side effects. Safe and rapidly absorbed.',
    sideEffectsNoticeTn: 'Ga e na ditlamorago dipe tse di kotsi.'
  },
  {
    id: 'epi-9months-mr',
    ageDueWeeks: 39,
    ageDueLabelEn: '9 Months (Dikgwedi tse 9)',
    ageDueLabelTn: 'Dikgwedi tse 9',
    vaccineName: 'Measles & Rubella 1 (MR 1) + Vitamin A',
    preventsEn: 'Measles (Mmasele) and German Measles (Rubella)',
    preventsTn: 'Bolwetse jwa Mmasele (Measles) le Rubella',
    routeOfAdministration: 'Subcutaneous injection upper arm + oral drops',
    clinicalImportanceEn: 'Measles is highly contagious and can cause severe pneumonia, blindness, and encephalitis in unvaccinated infants.',
    clinicalImportanceTn: 'Mmasele ke bolwetse jo bo tshelanwang ka bofefo jo bo ka senyang matlho le dikgofo tsa ngwana.',
    sideEffectsNoticeEn: 'Mild rash or fever may develop 5-10 days later as the body generates immunity.',
    sideEffectsNoticeTn: 'Leswabi le lennye le ka tswa morago ga malatsi a le 5-10.'
  },
  {
    id: 'epi-18months-mr2',
    ageDueWeeks: 78,
    ageDueLabelEn: '18 Months (Dikgwedi tse 18)',
    ageDueLabelTn: 'Dikgwedi tse 18 (Ngwaga le sephatlo)',
    vaccineName: 'Measles & Rubella 2 (MR 2) Booster + DTP Booster',
    preventsEn: 'Lifelong immunity booster against measles resurgences',
    preventsTn: 'Mokento wa bofelo wa mmasele o o sireletsang ngwana botshelo jotlhe',
    routeOfAdministration: 'Upper arm injection + thigh booster',
    clinicalImportanceEn: 'Secures permanent community herd immunity against national measles outbreaks.',
    clinicalImportanceTn: 'O kaba ditsebe tsa ngwana botshelo jotlhe kgatlhanong le mmasele.',
    sideEffectsNoticeEn: 'Slight soreness on upper arm for 1 day.',
    sideEffectsNoticeTn: 'Botlhoko jo bo motlhofo mo legetleng letsatsi le le lengwe.'
  }
];
