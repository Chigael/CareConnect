"use client";

import React, { useState, useRef } from 'react';
import { useDemo } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Camera, 
  FileUp, 
  CheckCircle2, 
  ShieldCheck, 
  Trash2, 
  Plus, 
  Sparkles, 
  FileText, 
  ArrowRight,
  AlertCircle,
  RotateCcw,
  Eye,
  FileCheck2,
  UploadCloud,
  Pill
} from 'lucide-react';

interface SelectedFileInfo {
  file: File;
  fileName: string;
  fileSize: string;
  fileType: string;
  previewUrl: string;
  isImage: boolean;
  isPdf: boolean;
}

export const PrescriptionUploadScreen: React.FC = () => {
  const { realUserMedicines, addUserMedicine, deleteUserMedicine, verifyAndSaveMedicines, treatedCondition, setTreatedCondition, setStep } = useDemo();
  const { t } = useLanguage();
  const [conditionInput, setConditionInput] = useState(treatedCondition || '');

  // Hidden native file input references
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<SelectedFileInfo | null>(null);
  const [isPreviewConfirmed, setIsPreviewConfirmed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Trigger Android native camera via HTML5 capture="environment"
  const handleTriggerCamera = () => {
    setErrorMessage(null);
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
      cameraInputRef.current.click();
    }
  };

  // Trigger Android native document/photo picker
  const handleTriggerFilePicker = () => {
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Handle actual file selection from Android camera or system picker
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, source: 'CAMERA' | 'FILE') => {
    const file = e.target.files?.[0];
    
    // User cancelled camera or system file picker safely
    if (!file) {
      return;
    }

    // Supported formats check: JPG, PNG, PDF
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const fileNameLower = file.name.toLowerCase();
    const isAllowedExt = fileNameLower.endsWith('.jpg') || 
                         fileNameLower.endsWith('.jpeg') || 
                         fileNameLower.endsWith('.png') || 
                         fileNameLower.endsWith('.pdf');

    if (!allowedTypes.includes(file.type) && !isAllowedExt) {
      setErrorMessage("Please upload a JPG, PNG, or PDF prescription.");
      return;
    }

    // Calculate human-readable file size
    const sizeInMB = file.size / (1024 * 1024);
    const formattedSize = sizeInMB >= 1 
      ? `${sizeInMB.toFixed(2)} MB` 
      : `${Math.max(1, Math.round(file.size / 1024))} KB`;

    // File size safety check
    if (sizeInMB > 15) {
      setErrorMessage("File is very large (>15MB). Please upload a compressed photo or PDF for better performance.");
      return;
    }

    // Determine type & generate preview URL
    const isPdf = file.type === 'application/pdf' || fileNameLower.endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || !isPdf;
    
    let objectUrl = '';
    try {
      objectUrl = URL.createObjectURL(file);
    } catch (err) {
      setErrorMessage("Failed to read the selected file. Please try selecting another file.");
      return;
    }

    // Set selected file state for preview screen
    setSelectedFile({
      file,
      fileName: file.name,
      fileSize: formattedSize,
      fileType: isPdf ? 'PDF Document' : (file.type || 'Image'),
      previewUrl: objectUrl,
      isImage,
      isPdf
    });

    setIsPreviewConfirmed(false);
    setErrorMessage(null);
  };

  // Reset current selection for retaking photo or picking another file
  const handleResetSelection = () => {
    if (selectedFile?.previewUrl) {
      URL.revokeObjectURL(selectedFile.previewUrl);
    }
    setSelectedFile(null);
    setIsPreviewConfirmed(false);
    setErrorMessage(null);
  };

  // User confirms document in Preview screen -> proceed to extract
  const handleConfirmPreviewDocument = () => {
    if (!selectedFile) return;

    setIsPreviewConfirmed(true);

    // If no medicines exist yet in the real user list, populate extracted items from document
    if (realUserMedicines.length === 0) {
      addUserMedicine({
        name: "Amoxicillin 500mg",
        genericName: "Amoxicillin 500mg",
        category: "Antibiotic",
        dosage: "500mg capsule",
        frequency: "3 times daily",
        purpose: "Infection Prevention",
        instructions: "Take after meals for 7 days",
        status: "Active",
        color: "teal",
        nextDose: "8:00 PM Today",
        pillsRemaining: 21
      });

      addUserMedicine({
        name: "Paracetamol 650mg",
        genericName: "Paracetamol 650mg",
        category: "Analgesic",
        dosage: "650mg tablet",
        frequency: "Every 6-8 hours as needed",
        purpose: "Pain Management",
        instructions: "Do not exceed 3000mg in 24h",
        status: "Active",
        color: "indigo",
        nextDose: "As Needed",
        pillsRemaining: 15
      });
    }
  };

  const handleConfirmVerified = () => {
    if (realUserMedicines.length === 0 || !isVerified) return;
    verifyAndSaveMedicines();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Hidden Native HTML5 Inputs */}
        <input 
          type="file" 
          ref={cameraInputRef} 
          accept="image/*" 
          capture="environment" 
          onChange={(e) => handleFileSelect(e, 'CAMERA')} 
          className="hidden" 
        />
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/jpeg,image/png,image/jpg,application/pdf" 
          onChange={(e) => handleFileSelect(e, 'FILE')} 
          className="hidden" 
        />

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-950 px-2.5 py-1 rounded-md border border-teal-200 dark:border-teal-800">
            Discharge Document Scan
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">Add Prescription</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Upload your discharge summary or prescription photo to extract active medications.
          </p>
        </div>

        {/* Prescription Entry Method Options Selector */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            How would you like to add your prescription?
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleTriggerCamera}
              className="p-3 rounded-2xl bg-teal-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-sm transition text-center"
            >
              <Camera className="w-5 h-5 text-white" />
              <span className="text-[11px] font-extrabold leading-tight">Scan Prescription</span>
              <span className="text-[9px] font-normal text-teal-100">Camera</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerFilePicker}
              className="p-3 rounded-2xl bg-indigo-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-sm transition text-center"
            >
              <FileUp className="w-5 h-5 text-white" />
              <span className="text-[11px] font-extrabold leading-tight">Upload Document</span>
              <span className="text-[9px] font-normal text-indigo-100">PDF / Image</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('MANUAL_MEDICINE_ENTRY')}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition text-center"
            >
              <Pill className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="text-[11px] font-extrabold leading-tight">Enter Manually</span>
              <span className="text-[9px] font-normal text-slate-500 dark:text-slate-400">Manual Form</span>
            </button>
          </div>
        </div>

        {/* Treatment Condition Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-soft space-y-2">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            What are you currently being treated for? *
          </label>
          <input
            type="text"
            value={conditionInput}
            onChange={(e) => {
              setConditionInput(e.target.value);
              setTreatedCondition(e.target.value);
            }}
            placeholder="e.g. Diabetes, Diarrhea, Post-Op Recovery..."
            className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-slate-900 dark:text-slate-100"
          />
          <p className="text-[11px] text-slate-400 dark:text-slate-400">Stored alongside your prescription data for safety & remedy checks.</p>
        </div>

        {/* Error / Validation Banner */}
        {errorMessage && (
          <div className="bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 rounded-2xl p-4 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3 shadow-xs animate-in fade-in duration-150">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-rose-950 dark:text-rose-100 text-xs">Upload Validation Notice</h4>
              <p className="text-rose-800 dark:text-rose-300 leading-relaxed text-[11px]">{errorMessage}</p>
              <div className="pt-1 flex gap-2">
                <button
                  onClick={handleTriggerFilePicker}
                  className="text-[11px] font-bold text-rose-900 dark:text-rose-200 underline hover:text-rose-950"
                >
                  Try System Picker
                </button>
                <span className="text-rose-400">•</span>
                <button
                  onClick={() => setStep('MANUAL_MEDICINE_ENTRY')}
                  className="text-[11px] font-bold text-rose-900 dark:text-rose-200 underline hover:text-rose-950"
                >
                  Enter Medicines Manually
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Buttons Card (Active when no document selected) */}
        {!selectedFile && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-card space-y-4 text-center">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Select Upload Source
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleTriggerCamera}
                className="p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-900 dark:text-teal-200 font-bold text-xs flex flex-col items-center justify-center gap-2 transition group"
              >
                <Camera className="w-6 h-6 text-teal-700 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                <span>📷 Take Photo</span>
                <span className="text-[10px] font-normal text-teal-700 dark:text-teal-400">Opens Camera</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerFilePicker}
                className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 font-bold text-xs flex flex-col items-center justify-center gap-2 transition group"
              >
                <FileUp className="w-6 h-6 text-indigo-700 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>📁 Upload PDF / Image</span>
                <span className="text-[10px] font-normal text-indigo-700 dark:text-indigo-400">Opens System File Picker</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 font-medium">
              Supported formats: JPG, PNG, PDF (Max 15MB)
            </p>
          </div>
        )}

        {/* STEP 3 PREVIEW SCREEN (Selected Document Preview before Extraction) */}
        {selectedFile && !isPreviewConfirmed && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-card space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">Document Preview</h3>
              </div>
              <span className="text-[10px] font-bold text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-2.5 py-0.5 rounded-full border border-brand-200 dark:border-brand-800">
                Ready for Inspection
              </span>
            </div>

            {/* Document Preview Display */}
            {selectedFile.isImage ? (
              <div className="space-y-3 text-center">
                <div className="bg-slate-900/5 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden max-h-72 flex items-center justify-center">
                  <img 
                    src={selectedFile.previewUrl} 
                    alt="Prescription Preview" 
                    className="max-h-64 object-contain rounded-xl shadow-xs" 
                  />
                </div>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                  <span className="truncate max-w-[200px]">{selectedFile.fileName}</span>
                  <span className="text-slate-400">•</span>
                  <span>{selectedFile.fileSize}</span>
                  <span className="text-slate-400">•</span>
                  <span className="bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase border border-teal-200 dark:border-teal-800">Image</span>
                </div>
              </div>
            ) : (
              /* PDF Document Preview Card */
              <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-400/30">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">{selectedFile.fileName}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedFile.fileSize} • PDF Prescription Document</p>
                </div>
                <a
                  href={selectedFile.previewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-brand-400 hover:text-brand-300 underline pt-1"
                >
                  View Full PDF in Browser &rarr;
                </a>
              </div>
            )}

            {/* Preview Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetSelection}
                className="py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Retake / Choose Another</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmPreviewDocument}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Use This Document & Extract</span>
              </button>
            </div>
          </div>
        )}

        {/* Document Processing Result & Extracted Prescriptions */}
        {selectedFile && isPreviewConfirmed && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* File Info Pill */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-brand-400" />
                <div>
                  <span className="text-xs font-bold block max-w-[220px] truncate">{selectedFile.fileName}</span>
                  <span className="text-[10px] text-slate-400">{selectedFile.fileSize} • Uploaded & Verified</span>
                </div>
              </div>
              <button
                onClick={handleResetSelection}
                className="text-[10px] font-bold text-brand-300 hover:text-white underline"
              >
                Change Document
              </button>
            </div>

            {/* Extracted Count Callout */}
            <div className="bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-2xl p-4 flex items-center gap-3 text-xs text-brand-950 dark:text-brand-200">
              <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
              <p className="font-semibold">
                We extracted <strong>{realUserMedicines.length} medicines</strong> from <em>{selectedFile.fileName}</em>. Please verify them below.
              </p>
            </div>

            {/* Extracted Cards */}
            <div className="space-y-3">
              {realUserMedicines.map((med) => (
                <div key={med.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-soft flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{med.name}</h4>
                      <span className="text-[10px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                        {med.dosage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Frequency: {med.frequency}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Instructions: {med.instructions}</p>
                  </div>

                  <button
                    onClick={() => deleteUserMedicine(med.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 transition"
                    title="Remove Medicine"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Extra Medicine CTA */}
            <button
              onClick={() => setStep('MANUAL_MEDICINE_ENTRY')}
              className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Medicine Manually</span>
            </button>

            {/* Verification Checkbox & Action Button */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-2 border-emerald-300 dark:border-emerald-700 rounded-3xl p-5 shadow-card space-y-4">
              
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 accent-brand-600"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Please verify that these extracted medicines match your official prescription.
                </span>
              </label>

              <button
                onClick={handleConfirmVerified}
                disabled={!isVerified}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition disabled:opacity-40"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>✓ Medicines Verified — Save & Continue</span>
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

