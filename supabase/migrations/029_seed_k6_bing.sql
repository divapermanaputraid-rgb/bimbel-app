-- Migration 029: Seed subject, materials, and questions for K6 B.Inggris
-- 1 subject (bing, kelas 6) + 10 materials × 8 questions = 80 questions

-- Subject B.Inggris Kelas 6
INSERT INTO public.subjects (id, kode, nama, icon, kelas, urutan)
VALUES ('k6-bing', 'bing', 'Bahasa Inggris', '🇬🇧', 6, 2)
ON CONFLICT (id) DO UPDATE SET
  nama = EXCLUDED.nama,
  icon = EXCLUDED.icon,
  urutan = EXCLUDED.urutan;

-- Materials (10 units)
INSERT INTO public.materials (id, kelas, subject_id, judul, deskripsi, file_path, urutan)
VALUES
  ('k6-bing-01', 6, 'k6-bing', 'I Studied Last Night, But My Sister Didn''t', 'Unit 1 — Past Simple: Regular Verbs', '/buku/kelas6/bahasa-inggris/k6-bing-01.html', 1),
  ('k6-bing-02', 6, 'k6-bing', 'What an Experience!', 'Unit 2 — Recount Text: Holiday Experience', '/buku/kelas6/bahasa-inggris/k6-bing-02.html', 2),
  ('k6-bing-03', 6, 'k6-bing', 'I Was In Bali Last Week', 'Unit 3 — Past Simple: Was/Were', '/buku/kelas6/bahasa-inggris/k6-bing-03.html', 3),
  ('k6-bing-04', 6, 'k6-bing', 'How did Cici feel yesterday?', 'Unit 4 — Feelings & Emotions', '/buku/kelas6/bahasa-inggris/k6-bing-04.html', 4),
  ('k6-bing-05', 6, 'k6-bing', 'What did you do yesterday?', 'Unit 5 — Daily Activities: Irregular Verbs', '/buku/kelas6/bahasa-inggris/k6-bing-05.html', 5),
  ('k6-bing-06', 6, 'k6-bing', 'My Friend''s Experience', 'Unit 6 — Recount: Friend''s Story', '/buku/kelas6/bahasa-inggris/k6-bing-06.html', 6),
  ('k6-bing-07', 6, 'k6-bing', 'I will go to Bromo', 'Unit 7 — Future Tense: Will', '/buku/kelas6/bahasa-inggris/k6-bing-07.html', 7),
  ('k6-bing-08', 6, 'k6-bing', 'We Will Have Fun!', 'Unit 8 — Future Tense: Going To', '/buku/kelas6/bahasa-inggris/k6-bing-08.html', 8),
  ('k6-bing-09', 6, 'k6-bing', 'Tomorrow, Next Year', 'Unit 9 — Future Time Adverbials', '/buku/kelas6/bahasa-inggris/k6-bing-09.html', 9),
  ('k6-bing-10', 6, 'k6-bing', 'I want to be a pilot', 'Unit 10 — Jobs & Dreams', '/buku/kelas6/bahasa-inggris/k6-bing-10.html', 10)
ON CONFLICT (id) DO UPDATE SET
  judul = EXCLUDED.judul,
  deskripsi = EXCLUDED.deskripsi,
  urutan = EXCLUDED.urutan;

-- Questions (8 per material, level 1)
INSERT INTO public.questions (material_id, soal, pilihan, jawaban_benar, level, penjelasan)
VALUES
-- k6-bing-01: Past Simple Regular Verbs
('k6-bing-01', '''Studied'' is the past form of...', '["study", "studying", "student"]', 'study', 1, 'Past form of study is studied (base: study). ✅'),
('k6-bing-01', 'I ___ TV last night. (watch)', '["watch", "watched", "watching"]', 'watched', 1, 'Regular verb: watch → watched. ✅'),
('k6-bing-01', 'Negative form of "I watched TV" is...', '["I didn''t watch TV", "I don''t watch TV", "I not watch TV"]', 'I didn''t watch TV', 1, 'Past negative: didn''t + base verb. ✅'),
('k6-bing-01', 'Past form of "clean" is...', '["cleaned", "clean", "cleaning"]', 'cleaned', 1, 'Regular verb: clean → cleaned. ✅'),
('k6-bing-01', 'Choose the correct past form: "visit" → ___', '["visited", "visiting", "visit"]', 'visited', 1, 'visit → visited (add -ed). ✅'),
('k6-bing-01', 'Fill the blank: She ___ the house yesterday. (clean)', '["clean", "cleaned", "cleans"]', 'cleaned', 1, 'Past tense: cleaned. ✅'),
('k6-bing-01', 'Negative: "He played football." → He ___ football.', '["didn''t play", "doesn''t play", "don''t play"]', 'didn''t play', 1, 'Past negative uses didn''t + base verb. ✅'),
('k6-bing-01', 'Arrange: "did / you / what / do / yesterday"', '["What did you do yesterday?", "What do you did yesterday?", "Did what you do yesterday?"]', 'What did you do yesterday?', 1, 'Question form: What did you do yesterday? ✅'),

-- k6-bing-02: Recount Text
('k6-bing-02', '"First, then, finally" are...', '["Time connectives", "Adjectives", "Prepositions"]', 'Time connectives', 1, 'Time connectives link events in order. ✅'),
('k6-bing-02', 'Past form of "buy" is...', '["buyed", "bought", "buying"]', 'bought', 1, 'Irregular verb: buy → bought. ✅'),
('k6-bing-02', 'The structure of Recount text is...', '["Orientation → Events → Re-orientation", "Introduction → Body → Conclusion", "Problem → Solution → Result"]', 'Orientation → Events → Re-orientation', 1, 'Recount = Orientation, Events, Re-orientation. ✅'),
('k6-bing-02', '"Finally" in Indonesian is...', '["Pertama", "Kemudian", "Akhirnya"]', 'Akhirnya', 1, 'Finally = akhirnya. ✅'),
('k6-bing-02', 'Match: "First" → Indonesian', '["Akhirnya", "Pertama", "Kemudian"]', 'Pertama', 1, 'First = pertama. ✅'),
('k6-bing-02', 'Past of "go" is...', '["goed", "went", "gone"]', 'went', 1, 'Irregular: go → went. ✅'),
('k6-bing-02', 'Fill: They ___ gudeg for lunch. (eat)', '["eat", "ate", "eaten"]', 'ate', 1, 'Irregular: eat → ate. ✅'),
('k6-bing-02', 'True/False: Recount text tells past experience.', '["TRUE", "FALSE"]', 'TRUE', 1, 'Recount text = past experience story. ✅'),

-- k6-bing-03: Was/Were
('k6-bing-03', '"Was" is used with...', '["I / he / she / it", "you / we / they", "all subjects"]', 'I / he / she / it', 1, 'Was = I/he/she/it. Were = you/we/they. ✅'),
('k6-bing-03', 'Past of "is/am" is...', '["were", "was", "be"]', 'was', 1, 'is/am → was. ✅'),
('k6-bing-03', 'Cici ___ in Bali last week.', '["was", "were", "is"]', 'was', 1, 'Cici = she → was. ✅'),
('k6-bing-03', 'Negative: "The beach was beautiful." → The beach ___ beautiful.', '["wasn''t", "weren''t", "isn''t"]', 'wasn''t', 1, 'Was → wasn''t (was not). ✅'),
('k6-bing-03', 'Choose: "She ___ happy yesterday."', '["was", "were", "is"]', 'was', 1, 'She = singular → was. ✅'),
('k6-bing-03', 'Fill: They ___ at the hotel. (be)', '["was", "were", "are"]', 'were', 1, 'They → were. ✅'),
('k6-bing-03', 'Match: "weren''t" =', '["were not", "was not", "are not"]', 'were not', 1, 'Weren''t = were not. ✅'),
('k6-bing-03', 'True/False: "Were" is used with "I".', '["TRUE", "FALSE"]', 'FALSE', 1, 'I uses "was", not "were". ✅'),

-- k6-bing-04: Feelings & Emotions
('k6-bing-04', 'Past form of "feel" is...', '["feeled", "felt", "feeling"]', 'felt', 1, 'Irregular: feel → felt. ✅'),
('k6-bing-04', '"Proud" in Indonesian is...', '["malu", "bangga", "marah"]', 'bangga', 1, 'Proud = bangga. ✅'),
('k6-bing-04', 'Cici won. She felt ___', '["happy", "sad", "angry"]', 'happy', 1, 'Winning → happy. ✅'),
('k6-bing-04', 'Question: "How ___ you feel?"', '["do", "did", "are"]', 'did', 1, 'Past question: How did you feel? ✅'),
('k6-bing-04', 'Match: "angry" → emoji', '["😊", "😢", "😠"]', '😠', 1, 'Angry = 😠. ✅'),
('k6-bing-04', 'Fill: I ___ nervous before the exam. (feel)', '["feel", "felt", "feels"]', 'felt', 1, 'Past tense: felt. ✅'),
('k6-bing-04', 'Choose: "She ___ proud of her score."', '["felt", "feel", "feels"]', 'felt', 1, 'Past: felt. ✅'),
('k6-bing-04', 'True/False: "Felt" is past of "feel".', '["TRUE", "FALSE"]', 'TRUE', 1, 'Feel → felt (irregular). ✅'),

-- k6-bing-05: Daily Activities Irregular Verbs
('k6-bing-05', 'Past of "wake up" is...', '["woked up", "woke up", "waking up"]', 'woke up', 1, 'Irregular: wake up → woke up. ✅'),
('k6-bing-05', 'Past of "have" (eat) is...', '["haved", "had", "having"]', 'had', 1, 'Irregular: have → had. ✅'),
('k6-bing-05', 'Past of "go" is...', '["goed", "went", "gone"]', 'went', 1, 'Irregular: go → went. ✅'),
('k6-bing-05', 'Negative: "I did my homework." → I ___ my homework.', '["didn''t do", "don''t do", "not do"]', 'didn''t do', 1, 'Past negative: didn''t + base verb. ✅'),
('k6-bing-05', 'Match: "ate" → base form', '["eat", "ate", "eaten"]', 'eat', 1, 'Ate is past of eat. ✅'),
('k6-bing-05', 'Fill: She ___ up at 7. (wake)', '["woke", "waked", "wakes"]', 'woke', 1, 'Wake → woke. ✅'),
('k6-bing-05', 'Choose: "They ___ to school by bus."', '["went", "go", "goed"]', 'went', 1, 'Go → went. ✅'),
('k6-bing-05', 'True/False: "Had" is past of "have".', '["TRUE", "FALSE"]', 'TRUE', 1, 'Have → had. ✅'),

-- k6-bing-06: Friend's Experience (Third Person Recount)
('k6-bing-06', 'Third person singular pronoun is...', '["I", "he/she", "we"]', 'he/she', 1, 'Third person = he/she/it. ✅'),
('k6-bing-06', 'Past of "climb" is...', '["climbed", "climb", "climbing"]', 'climbed', 1, 'Regular: climb → climbed. ✅'),
('k6-bing-06', 'Andi climbed the mountain. Pronoun for Andi is...', '["he", "she", "it"]', 'he', 1, 'Andi (male name) → he. ✅'),
('k6-bing-06', 'Past of "reach" is...', '["reached", "reach", "reaching"]', 'reached', 1, 'Regular: reach → reached. ✅'),
('k6-bing-06', 'Fill: He ___ the mountain last week. (climb)', '["climbed", "climb", "climbing"]', 'climbed', 1, 'Past: climbed. ✅'),
('k6-bing-06', 'Choose: "___ was tired but happy."', '["He", "Him", "His"]', 'He', 1, 'Subject pronoun: He. ✅'),
('k6-bing-06', 'Match: "reached" → base form', '["reach", "reaching", "reached"]', 'reach', 1, 'Reached is past of reach. ✅'),
('k6-bing-06', 'True/False: Third person uses "he/she".', '["TRUE", "FALSE"]', 'TRUE', 1, 'Third person = he/she/it. ✅'),

-- k6-bing-07: Future Will
('k6-bing-07', '"Will" is used for...', '["Past", "Present", "Future"]', 'Future', 1, 'Will = future tense. ✅'),
('k6-bing-07', 'Form: I ___ go to Bromo.', '["will", "am", "was"]', 'will', 1, 'Future: will + base verb. ✅'),
('k6-bing-07', 'Negative of "I will go" is...', '["I won''t go", "I don''t go", "I not go"]', 'I won''t go', 1, 'Won''t = will not. ✅'),
('k6-bing-07', 'Question: "___ you visit grandma?"', '["Will", "Do", "Did"]', 'Will', 1, 'Future question: Will you...? ✅'),
('k6-bing-07', 'Fill: She ___ visit her friend tomorrow. (will)', '["will", "will not", "wills"]', 'will', 1, 'Will + base verb. ✅'),
('k6-bing-07', 'Choose: "We ___ have a party next week."', '["will", "are", "were"]', 'will', 1, 'Future: will. ✅'),
('k6-bing-07', 'Match: "won''t" =', '["will not", "would not", "want not"]', 'will not', 1, 'Won''t = will not. ✅'),
('k6-bing-07', 'True/False: "Will" is followed by base verb.', '["TRUE", "FALSE"]', 'TRUE', 1, 'Will + base verb (no -s, -ed). ✅'),

-- k6-bing-08: Future Going To
('k6-bing-08', '"Going to" is used for...', '["Planned future", "Past habit", "Present fact"]', 'Planned future', 1, 'Going to = planned future. ✅'),
('k6-bing-08', 'Form: I am ___ to pack.', '["going", "go", "went"]', 'going', 1, 'Am/is/are + going to + base verb. ✅'),
('k6-bing-08', 'Cici bought tickets. This is...', '["Planned (going to)", "Spontaneous (will)"]', 'Planned (going to)', 1, 'Already bought = planned. ✅'),
('k6-bing-08', 'Form: She ___ going to buy tickets.', '["is", "am", "are"]', 'is', 1, 'She → is going to. ✅'),
('k6-bing-08', 'Fill: I ___ going to prepare my bag. (am/is/are)', '["am", "is", "are"]', 'am', 1, 'I → am going to. ✅'),
('k6-bing-08', 'Choose: "They ___ going to the beach."', '["are", "is", "am"]', 'are', 1, 'They → are going to. ✅'),
('k6-bing-08', 'Match: "will" → spontaneous decision', '["📋 planned", "⚡ spontaneous", "📜 past"]', '⚡ spontaneous', 1, 'Will = spontaneous/prediction. ✅'),
('k6-bing-08', 'True/False: "Going to" = already planned.', '["TRUE", "FALSE"]', 'TRUE', 1, 'Going to = planned. ✅'),

-- k6-bing-09: Future Time Adverbials
('k6-bing-09', '"Tomorrow" means...', '["besok", "kemarin", "lusa"]', 'besok', 1, 'Tomorrow = besok. ✅'),
('k6-bing-09', '"Next year" in Indonesian is...', '["tahun lalu", "tahun ini", "tahun depan"]', 'tahun depan', 1, 'Next year = tahun depan. ✅'),
('k6-bing-09', 'Time adverbial usually goes at...', '["End or beginning of sentence", "Middle only", "Before subject only"]', 'End or beginning of sentence', 1, 'Time adverbial: start or end. ✅'),
('k6-bing-09', '"In three days" =', '["3 hari lalu", "dalam 3 hari", "3 minggu depan"]', 'dalam 3 hari', 1, 'In three days = dalam 3 hari. ✅'),
('k6-bing-09', 'Match: "soon" → Indonesian', '["nanti", "segera", "kemarin"]', 'segera', 1, 'Soon = segera. ✅'),
('k6-bing-09', 'Fill: I will call you ___. (besok)', '["tomorrow", "yesterday", "now"]', 'tomorrow', 1, 'Besok = tomorrow. ✅'),
('k6-bing-09', 'Choose: "___ week, we have a test."', '["Next", "Last", "This"]', 'Next', 1, 'Next week = minggu depan. ✅'),
('k6-bing-09', 'True/False: "Next month" = bulan depan.', '["TRUE", "FALSE"]', 'TRUE', 1, 'Next month = bulan depan. ✅'),

-- k6-bing-10: Jobs & Dreams
('k6-bing-10', '"Pilot" in Indonesian is...', '["pemandu", "pilot", "penumpang"]', 'pilot', 1, 'Pilot = pilot. ✅'),
('k6-bing-10', '"I want to be a ___" = "Aku mau jadi ___"', '["doctor", "docter", "dokter"]', 'doctor', 1, 'English word: doctor. ✅'),
('k6-bing-10', 'He wants to be a pilot. "Wants" (with s) because...', '["he = third person singular", "pilot = singular", "want = verb"]', 'he = third person singular', 1, 'He/she/it → verb + s. ✅'),
('k6-bing-10', '"Why do you want to be a doctor?" Answer: "Because I want to ___ people."', '["help", "helps", "helping"]', 'help', 1, 'Want to + base verb (help). ✅'),
('k6-bing-10', 'Match: "astronaut" → emoji', '["✈️", "🩺", "👨‍🚀"]', '👨‍🚀', 1, 'Astronaut = 👨‍🚀. ✅'),
('k6-bing-10', 'Fill: She ___ to be a teacher. (want)', '["want", "wants", "wanted"]', 'wants', 1, 'She → wants (3rd person +s). ✅'),
('k6-bing-10', 'Choose: "I want to be an ___."', '["engineer", "engineers", "engineering"]', 'engineer', 1, 'A/an + singular noun. ✅'),
('k6-bing-10', 'True/False: "Want to be" expresses future dreams.', '["TRUE", "FALSE"]', 'TRUE', 1, 'Want to be = cita-cita masa depan. ✅');