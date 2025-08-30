import React, { useState, useRef, useCallback, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  OAuthProvider,
} from 'firebase/auth';
import { Camera, Upload, MapPin, Trophy, Leaf, Recycle, Award, User, LogIn, LogOut, Trash2, Star, Medal, Crown, Search } from 'lucide-react';
import WasteSegregationChatbot from './Chatbot3';
import ContactForm from './Contact';
import WasteStatisticsDashboard from './About';
import SmartWasteSystem from './Coming';
import SmartWasteIssuesDashboard from './Current';

 
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

const mockAIClassification = (imageData) => {
  const wasteTypes = [
    { type: 'Plastic Bottle', category: 'Recyclable', points: 10, color: 'text-green-600', icon: '♻️' },
    { type: 'Paper', category: 'Recyclable', points: 8, color: 'text-green-600', icon: '📄' },
    { type: 'Glass Bottle', category: 'Recyclable', points: 12, color: 'text-green-700', icon: '🍾' },
    { type: 'Food Waste', category: 'Compostable', points: 6, color: 'text-green-600', icon: '🥬' },
    { type: 'Electronic Waste', category: 'Special Disposal', points: 15, color: 'text-green-700', icon: '📱' },
    { type: 'Metal Can', category: 'Recyclable', points: 10, color: 'text-green-800', icon: '🥫' },
  ];
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wasteTypes.length);
      resolve(wasteTypes[randomIndex]);
    }, 1500);
  });
};

 
const firebaseConfig = {
  apiKey: 'AIzaSyAv_B4Io-CsycOZGT9NXEsze7S-I35j7KY',
  authDomain: 'smart-waste-ebc40.firebaseapp.com',
  projectId: 'smart-waste-ebc40',
  storageBucket: 'smart-waste-ebc40.firebasestorage.app',
  messagingSenderId: '863702878315',
  appId: '1:863702878315:web:acef63489adf573312092e',
  measurementId: 'G-VD7HP65CBQ',
  
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
 
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
// GitHub provider
const githubProvider = new GithubAuthProvider();
// Apple provider
const appleProvider = new OAuthProvider('apple.com');

// Mock Firestore
const mockFirestore = {
  users: [
    { id: '1', name: 'Alex Chen', points: 245, scans: 25, badges: ['Eco Starter', 'Plastic Buster'] },
    { id: '2', name: 'Sarah Johnson', points: 189, scans: 19, badges: ['Eco Starter'] },
    { id: '3', name: 'Mike Rodriguez', points: 167, scans: 17, badges: ['Eco Starter'] },
    { id: '4', name: 'Emily Davis', points: 143, scans: 14, badges: ['Eco Starter'] },
    { id: '5', name: 'You', points: 0, scans: 0, badges: [] }
  ],
  updateUserPoints: (userId, points) => Promise.resolve()
};

const WasteScannerApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState({ points: 0, scans: 0, badges: [] });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState(mockFirestore.users);
  const [showCamera, setShowCamera] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null); // { lat, lng }
  const [locationError, setLocationError] = useState(null);
  const [aiModel, setAiModel] = useState(null);
  const [aiReady, setAiReady] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(null); // { title, points }
  const [redeemedItems, setRedeemedItems] = useState([]); // [{id,title,points,img,ts}]
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState(null);

  // Auto-hide Approved banner after 10 seconds
  useEffect(() => {
    if (!redeemSuccess) return;
    const t = setTimeout(() => setRedeemSuccess(null), 3000);
    return () => clearTimeout(t);
  }, [redeemSuccess]);

  // --- Persistence helpers (per email) ---
  const getUserKey = (email) => `eco_scan_stats::${email || ''}`;
  const loadUserStats = (email) => {
    try {
      const raw = localStorage.getItem(getUserKey(email));
      if (!raw) return { points: 0, scans: 0, badges: [] };
      const parsed = JSON.parse(raw);
      return {
        points: Number(parsed.points) || 0,
        scans: Number(parsed.scans) || 0,
        badges: Array.isArray(parsed.badges) ? parsed.badges : [],
      };
    } catch { return { points: 0, scans: 0, badges: [] }; }
  };
  const saveUserStats = (email, stats) => {
    try { localStorage.setItem(getUserKey(email), JSON.stringify(stats)); } catch {}
  };
  const getRedeemedKey = (email) => `eco_scan_redeemed::${email || ''}`;
  const loadRedeemed = (email) => {
    try {
      const raw = localStorage.getItem(getRedeemedKey(email));
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  };
  const saveRedeemed = (email, items) => {
    try { localStorage.setItem(getRedeemedKey(email), JSON.stringify(items)); } catch {}
  };

  // Observe Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({ uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName || 'You' });
        const persisted = loadUserStats(fbUser.email);
        setUserStats(persisted);
        setRedeemedItems(loadRedeemed(fbUser.email));
        // reflect on leaderboard for 'You'
        setLeaderboard(prev => prev.map(u => u.name === 'You' ? { ...u, points: persisted.points, scans: persisted.scans, badges: persisted.badges } : u).sort((a, b) => b.points - a.points));
        setCurrentView('home');
        setShowLoginModal(false);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Optionally load an on-device TensorFlow.js model (if dependencies are installed and a model URL is provided)
  useEffect(() => {
    const MODEL_URL = import.meta.env.VITE_WASTE_MODEL_URL || '';
    if (!MODEL_URL) return; // No model URL provided, keep mock fallback
    (async () => {
      try {
        const tf = await import('@tensorflow/tfjs');
        await tf.ready();
        // Supports GraphModel (SavedModel converted) and LayersModel; try GraphModel first
        let model;
        try {
          const { loadGraphModel } = await import('@tensorflow/tfjs-converter');
          model = await loadGraphModel(MODEL_URL);
        } catch {
          // fallback to layers model
          model = await tf.loadLayersModel(MODEL_URL);
        }
        setAiModel(model);
        setAiReady(true);
      } catch (e) {
        console.warn('AI model not loaded (fallback to mock):', e?.message || e);
        setAiModel(null);
        setAiReady(false);
      }
    })();
  }, []);

  // Map raw labels to app categories, points, icon, color, and solution guidance
  const interpretLabel = (label) => {
    const normalized = String(label || '').toLowerCase();

    const mk = (cfg) => ({ isWaste: true, points: 10, color: 'text-green-700', icon: '♻️', category: 'Recyclable', ...cfg });

    const solutions = {
      plastic: 'Rinse if needed. Remove caps/labels where required. Place in plastic recycling. Soft films/bags may require store drop-off.',
      paper: 'Keep clean and dry. Flatten cartons and cardboard. Place in paper/cardboard recycling.',
      glass: 'Rinse and place in glass recycling/bank. Do not mix ceramics or mirrors.',
      metal: 'Rinse cans/foil. Crush to save space. Place in metal recycling.',
      organic: 'Place in food/organic bin or compost. Drain liquids; avoid packaging.',
      ewaste: 'Never bin. Take to certified e‑waste collection. Remove batteries and data wipe devices.',
      textiles: 'Donate if reusable. Otherwise take to textile recycling points; avoid general trash.',
      hazardous: 'Do not bin. Take to municipal hazardous waste facility. Handle carefully.',
      mixed: 'Non‑recyclable or contaminated. Place in general trash, or separate/clean to recycle.',
    };

    // Plastic (bottles, bags, wrappers)
    if (/(plastic|pet|hdpe|bottle|bag|wrapper|film)/.test(normalized))
      return mk({ type: 'Plastic', icon: '🧴', solution: solutions.plastic });

    // Paper & Cardboard
    if (/(paper|cardboard|carton|newspaper|office)/.test(normalized))
      return mk({ type: 'Paper & Cardboard', icon: '📦', solution: solutions.paper });

    // Glass
    if (/(glass|jar|shard|bottle)/.test(normalized))
      return mk({ type: 'Glass', icon: '🫙', solution: solutions.glass });

    // Metal
    if (/(metal|aluminum|steel|can|foil|scrap)/.test(normalized))
      return mk({ type: 'Metal', icon: '🥫', solution: solutions.metal });

    // Organic / Food Waste
    if (/(organic|food|vegetable|fruit|leftover|compost)/.test(normalized))
      return { isWaste: true, type: 'Organic / Food Waste', category: 'Compostable', points: 6, color: 'text-green-600', icon: '🥬', solution: solutions.organic };

    // E‑waste (batteries, phones, chargers, electronics)
    if (/(e-waste|ewaste|battery|batteries|phone|charger|cable|electronic|laptop|device)/.test(normalized))
      return { isWaste: true, type: 'E‑waste', category: 'Special Disposal', points: 15, color: 'text-green-700', icon: '📱', solution: solutions.ewaste };

    // Textiles (clothes, fabric, shoes)
    if (/(textile|clothes|clothing|fabric|garment|shoe|footwear)/.test(normalized))
      return mk({ type: 'Textiles', icon: '👕', solution: solutions.textiles });

    // Hazardous Waste (paint, chemicals, medical sharps)
    if (/(hazardous|paint|chemical|solvent|acid|alkali|sharps|syringe|medical|biohazard)/.test(normalized))
      return { isWaste: true, type: 'Hazardous Waste', category: 'Special Disposal', points: 20, color: 'text-red-700', icon: '☣️', solution: solutions.hazardous };

    // Mixed Waste / General Trash
    if (/(mixed|general|trash|garbage|contaminated|residual)/.test(normalized))
      return { isWaste: true, type: 'Mixed Waste / General Trash', category: 'Landfill', points: 2, color: 'text-gray-600', icon: '🗑️', solution: solutions.mixed };

    // Unknown or not waste
    return { isWaste: false, type: 'Unknown Item', category: 'Uncategorized', points: 0, color: 'text-gray-500', icon: '❓', solution: '' };
  };

  // Update default labels for models without embedded metadata
  // (env can override)
  // prettier-ignore
  const DEFAULT_LABELS = 'plastic,paper,cardboard,glass,metal,organic,food waste,ewaste,battery,phone,charger,electronics,textiles,clothes,fabric,shoes,hazardous,paint,chemical,medical,sharps,mixed,general trash,residual';

  const runModelOnImage = async (imageElement) => {
    try {
      if (!aiModel) return null;
      const tf = await import('@tensorflow/tfjs');
      const tensor = tf.browser.fromPixels(imageElement).toFloat();
      const resized = tf.image.resizeBilinear(tensor, [224, 224]);
      const normalized = resized.div(tf.scalar(255)).expandDims(0);
      const logits = aiModel.execute ? aiModel.execute(normalized) : aiModel.predict(normalized);
      let data;
      if (Array.isArray(logits)) {
        data = await logits[0].data();
      } else {
        data = await logits.data();
      }
      // Find top index
      let topIdx = 0; let topVal = -Infinity;
      for (let i = 0; i < data.length; i++) { if (data[i] > topVal) { topVal = data[i]; topIdx = i; } }
      // Labels need to match your trained model; fallback generic mapping
      const labels = (import.meta.env.VITE_WASTE_LABELS || DEFAULT_LABELS).split(',');
      const predicted = labels[topIdx] || 'unknown';
      tensor.dispose(); resized.dispose(); normalized.dispose(); if (logits.dispose) logits.dispose();
      return interpretLabel(predicted);
    } catch (e) {
      console.warn('AI inference failed; using mock:', e?.message || e);
      return null;
    }
  };

  const classifyWithAI = async (fileOrCanvas) => {
    const mock = await mockAIClassification(fileOrCanvas);
    const interp = interpretLabel(mock.type);
    return { ...mock, isWaste: true, solution: interp.solution || '' };
  };

  // Auto-detect location when user switches to Map view
  useEffect(() => {
    if (currentView === 'map' && !userLocation) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
            setLocationError(null);
          },
          (err) => {
            setLocationError(err.message || 'Unable to fetch location');
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser');
      }
    }
  }, [currentView, userLocation]);

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationError(null);
        },
        (err) => setLocationError(err.message || 'Unable to fetch location'),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser');
    }
  };

  // Badge system
  const badges = {
    'Eco Starter': { threshold: 1, icon: '🌱', color: 'bg-green-100 text-green-800' },
    'Plastic Buster': { threshold: 10, icon: '♻️', color: 'bg-green-200 text-green-900' },
    'Eco Hero': { threshold: 50, icon: '🌍', color: 'bg-green-100 text-green-800' },
    'Waste Warrior': { threshold: 100, icon: '🏆', color: 'bg-green-300 text-green-900' }
  };

  const checkForNewBadges = (scans) => {
    const newBadges = [];
    Object.entries(badges).forEach(([badgeName, badge]) => {
      if (scans >= badge.threshold && !userStats.badges.includes(badgeName)) {
        newBadges.push(badgeName);
      }
    });
    return newBadges;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
        const fbUser = result.user;
        setUser({ uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName || 'You' });
        const persisted = loadUserStats(fbUser.email);
        setUserStats(persisted);
        setRedeemedItems(loadRedeemed(fbUser.email));
        setLeaderboard(prev => prev.map(u => u.name === 'You' ? { ...u, points: persisted.points, scans: persisted.scans, badges: persisted.badges } : u).sort((a, b) => b.points - a.points));
      } else {
        const result = await createUserWithEmailAndPassword(auth, loginForm.email, loginForm.password);
        if (loginForm.name) {
          await updateProfile(result.user, { displayName: loginForm.name });
        }
        const fbUser = result.user;
        setUser({ uid: fbUser.uid, email: fbUser.email, displayName: loginForm.name || 'You' });
        const persisted = loadUserStats(fbUser.email);
        setUserStats(persisted);
        setRedeemedItems(loadRedeemed(fbUser.email));
        setLeaderboard(prev => prev.map(u => u.name === 'You' ? { ...u, points: persisted.points, scans: persisted.scans, badges: persisted.badges } : u).sort((a, b) => b.points - a.points));
      }
      setCurrentView('home');
      setShowLoginModal(false);
    } catch (error) {
      console.error('Auth error:', error);
      alert(`Authentication failed: ${error.code || ''} ${error.message || ''}`.trim());
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      setUser({ uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName || 'You' });
      setCurrentView('home');
      setShowLoginModal(false);
    } catch (error) {
      console.error('Google sign-in error:', error);
      alert(`Authentication failed: ${error.code || ''} ${error.message || ''}`.trim());
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const fbUser = result.user;
      setUser({ uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName || 'You' });
      setCurrentView('home');
      setShowLoginModal(false);
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      alert(`Authentication failed: ${error.code || ''} ${error.message || ''}`.trim());
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const fbUser = result.user;
      setUser({ uid: fbUser.uid, email: fbUser.email, displayName: fbUser.displayName || 'You' });
      setCurrentView('home');
      setShowLoginModal(false);
    } catch (error) {
      console.error('Apple sign-in error:', error);
      alert(`Authentication failed: ${error.code || ''} ${error.message || ''}`.trim());
    }
  };

  const handleLogout = () => {
    firebaseSignOut(auth).finally(() => {
    setUser(null);
    setUserStats({ points: 0, scans: 0, badges: [] });
      // stay on current view
    });
  };

  const handleImageUpload = async (event) => {
    if (!user) {
      setShowLoginModal(true);
      alert('Please log in to scan or upload waste items.');
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setIsScanning(true);
      setScanResult(null);
      
      try {
        const result = await classifyWithAI(file);
        if (result?.isWaste) {
        setScanResult(result);
        } else {
          setScanResult(null);
        }
        
        // Only award points if recognized as waste
        if (result?.isWaste) {
          const newPoints = userStats.points + (result.points || 0);
        const newScans = userStats.scans + 1;
        const newBadges = checkForNewBadges(newScans);
          const updatedBadges = [...userStats.badges, ...newBadges];
          setUserStats({ points: newPoints, scans: newScans, badges: updatedBadges });
          if (user?.email) saveUserStats(user.email, { points: newPoints, scans: newScans, badges: updatedBadges });
          setLeaderboard(prev => prev.map(u => u.name === 'You' ? { ...u, points: newPoints, scans: newScans, badges: updatedBadges } : u).sort((a, b) => b.points - a.points));
        if (newBadges.length > 0) {
            setTimeout(() => { alert(`🎉 New badge earned: ${newBadges.join(', ')}!`); }, 2000);
        }
        }
 
      } catch (error) {
        alert('Scan failed. Please try again.');
      }
      
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    try {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    } catch {}
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setCameraError(null);
  };

  const startCamera = async () => {
    if (!user) {
      setShowLoginModal(true);
      alert('Please log in to use the camera.');
      return;
    }
    setShowCamera(true);
    try {
      // Prefer rear camera when available
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Ensure autoplay works on iOS by setting playsinline/muted
        try {
          videoRef.current.setAttribute('playsinline', 'true');
          videoRef.current.muted = true;
          await videoRef.current.play();
        } catch {}
      }
      setCameraError(null);
    } catch (error) {
      setCameraError(error?.message || 'Camera access denied by the browser.');
      setShowCamera(true);
    }
  };

  const preflightCameraPermission = async () => {
    try {
      // Trigger permission prompt explicitly
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      s.getTracks().forEach(t => t.stop());
      setCameraError(null);
      await startCamera();
    } catch (e) {
      setCameraError(e?.message || 'Camera permission is blocked. Use the lock icon in the address bar to allow camera.');
    }
  };

  const capturePhoto = () => {
    if (!user) {
      setShowLoginModal(true);
      alert('Please log in to scan items.');
      return;
    }
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      
      // Stop camera
      stopCamera();
      
      // Simulate AI processing
      setIsScanning(true);
      setTimeout(async () => {
        const result = await classifyWithAI(canvas);
        if (result?.isWaste) {
        setScanResult(result);
        } else {
          setScanResult(null);
        }
 
        setIsScanning(false);
        
      }, 1500);
    }
  };

  // Navigate to in-app Redeem catalog
  const handleRedeem = () => {
    setCurrentView('redeem');
  };

  // Reward catalog (images and costs inspired by provided HTML)
  const rewards = [
    { id: 'bread', title: 'Homemade Bread', points: 400, img: 'https://i.etsystatic.com/18244890/r/il/bc36eb/3046214025/il_fullxfull.3046214025_6za0.jpg' },
    { id: 'cookies', title: 'Chocolate Chip Cookies', points: 450, img: 'https://i.etsystatic.com/18244890/r/il/1f1a6d/3046281385/il_fullxfull.3046281385_nunt.jpg' },
    { id: 'pie', title: 'Apple Pie', points: 500, img: 'https://down-ph.img.susercontent.com/file/ph-11134207-7r98y-lsc84bdrqpkl80' },
    { id: 'jam', title: 'Berry Jam', points: 600, img: 'https://tse1.mm.bing.net/th/id/OIP.Zh0dPWRwPIZs3SOzBBBrhAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'pasta', title: 'Fresh Pasta', points: 650, img: 'https://tse3.mm.bing.net/th/id/OIP._H_hzXaLh9SF6C6JDe_MdQHaHa?w=866&h=866&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'salad', title: 'Garden Salad', points: 700, img: 'https://happyhappynester.com/wp-content/uploads/2021/08/dark-chocolate-kit-768x1024.jpg' },
    { id: 'soup', title: 'Tomato Soup', points: 750, img: 'https://i.pinimg.com/originals/91/5a/9c/915a9c3b4731e45e0b6f47851aad0c35.jpg' },
    { id: 'pancakes', title: 'Pancakes', points: 800, img: 'https://tse1.explicit.bing.net/th/id/OIP.wotfhI2036KE_PZOngR1XwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 'pickles', title: 'Cucumber Pickles', points: 1000, img: 'https://punkmed.com/wp-content/uploads/2022/11/eco-friendly-gift-basket-idea-zero-waste-sustainability-lover.jpg' },
  ];

  const handleRedeemItem = (reward) => {
    if (!user) {
      setShowLoginModal(true);
      alert('Please log in to redeem rewards.');
      return;
    }
    if ((userStats.points || 0) < reward.points) {
      alert('Not enough points to redeem this reward.');
      return;
    }
    const newPoints = userStats.points - reward.points;
    const newStats = { points: newPoints, scans: userStats.scans, badges: userStats.badges };
    setUserStats(newStats);
    if (user?.email) saveUserStats(user.email, newStats);
    setLeaderboard(prev => prev.map(u => u.name === 'You' ? { ...u, points: newPoints } : u).sort((a, b) => b.points - a.points));
    setRedeemSuccess({ title: reward.title, points: reward.points });
    // record redeemed items
    const entry = { id: `${reward.id}-${Date.now()}`, title: reward.title, points: reward.points, img: reward.img, ts: Date.now() };
    const next = [entry, ...redeemedItems];
    setRedeemedItems(next);
    if (user?.email) saveRedeemed(user.email, next);
  };

  // Using modal login instead of full-page auth

    return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-green-700 shadow-lg text-white">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
            </div>
              <h1 className="text-5xl md:text-5xl font-bold cursor-pointer">Eco-Scan</h1>
          </div>
          
            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8"> {/* increased max-width */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles, topics..."
                  className="w-full px-6 py-4 pl-12 bg-white text-gray-800 text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
              </div>
            </div>

            

         
           


            
            <div className="flex items-center space-x-4  ">
            <button
                onClick={handleRedeem}
                className="bg-white text-green-700 px-3 py-1.5 rounded-lg font-bold hover:bg-green-50 transition-colors cursor-pointer"
                title="Redeem your points"
            >
                Redeem Points
            </button>
              {!user && (
            <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-white text-green-700 px-3 py-1.5 rounded-lg font-bold hover:bg-green-50 transition-colors cursor-pointer"
                  title="Login"
            >
                  Login
            </button>
              )}
              <div className="flex items-center space-x-2 bg-green-600 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-white" />
                <span className="font-bold text-white">{userStats.points} pts</span>
        </div>
              
              {user && (
              <button
                onClick={handleLogout}
                  className="flex items-center space-x-2 text-white/90 hover:text-white font-bold transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-green-800 border-t border-green-700 text-white">
        <div className="w-full px-6">
          <div className="flex space-x-8">
            {[
              'home',
              'scan',
              'leaderboard',
              'map',
              'redeemed',
              'about',
              'current-issue',
              'coming-issue',
              'contact',
            ].map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`py-4 px-2 border-b-2 font-semibold text-lg md:text-xl transition-colors cursor-pointer ${
                  currentView === view
                    ? 'border-white text-white'
                    : 'border-transparent text-green-100 hover:text-white'
                }`}
              >
                {view === 'home' && (
                  <>
                    <Leaf className="w-5 h-5 inline mr-2" />
                    Dashboard
                  </>
                )}
                {view === 'scan' && (
                  <>
                    <Camera className="w-5 h-5 inline mr-2" />
                    Scan Waste
                  </>
                )}
                {view === 'leaderboard' && (
                  <>
                    <Trophy className="w-5 h-5 inline mr-2" />
                    Leaderboard
                  </>
                )}
                {view === 'map' && (
                  <>
                    <MapPin className="w-5 h-5 inline mr-2" />
                    Recycling Centers
                  </>
                )}
                {view === 'redeemed' && <>Redeemed Items</>}
                {view === 'about' && <>About</>}
                {view === 'current-issue' && <>Current Issue</>}
                {view === 'coming-issue' && <>Coming Issue</>}
                {view === 'contact' && <>Contact</>}
              </button>
            ))}
          </div>
        </div>
      </nav>


      {/* Auth Modal */}
      {showLoginModal && !user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-neutral-900 text-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute right-3 top-3 text-neutral-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Recycle className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-bold">Welcome to Eco-Scan</h2>
              <p className="text-sm text-neutral-300">Sign in to continue</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-left text-xs font-medium text-white mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full p-3 rounded-lg focus:ring-2 focus:ring-green-500 bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-400"
                />
              </div>

              <button
                onClick={() => setShowPassword(true)}
                className="w-full bg-white text-black p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium cursor-pointer"
              >
                Continue
              </button>

              <div className="flex items-center">
                <div className="flex-1 h-px bg-neutral-700"></div>
                <span className="px-3 text-neutral-400 text-xs uppercase tracking-wider">OR</span>
                <div className="flex-1 h-px bg-neutral-700"></div>
              </div>

              <button onClick={handleGoogleSignIn} className="w-full bg-black text-white p-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium cursor-pointer">Continue with Google</button>
              <button onClick={handleGithubSignIn} className="w-full bg-black text-white p-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium cursor-pointer">Continue with GitHub</button>
              <button onClick={handleAppleSignIn} className="w-full bg-black text-white p-3 rounded-lg hover:bg-neutral-800 transition-colors font-medium cursor-pointer">Continue with Apple</button>

              {showPassword && (
                <div className="space-y-3 pt-2">
                  {!isLogin && (
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={loginForm.name}
                      onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                      className="w-full p-3 rounded-lg focus:ring-2 focus:ring-green-500 bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-400"
                    />
                  )}
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full p-3 rounded-lg focus:ring-2 focus:ring-green-500 bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-400"
                  />
                  <button onClick={handleAuth} className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-colors font-medium">{isLogin ? 'Sign In' : 'Sign Up'}</button>
                </div>
              )}

              <p className="text-center mt-1 text-neutral-300 text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-green-400 hover:underline font-medium">{isLogin ? 'Sign Up' : 'Sign In'}</button>
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Home/Dashboard View */}
        {currentView === 'home' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Welcome back, {user?.displayName || 'Guest'}!</h2>
              <p className="text-2xl">Let's make the world cleaner, one scan at a time.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{userStats.points}</h3>
                <p className="text-2xl">Total Points</p>
              </div>


              <div className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4  ">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{userStats.scans}</h3>
                <p className="text-2xl">Items Scanned</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{userStats.badges.length}</h3>
                <p className="text-2xl">Badges Earned</p>
              </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Your Badges
              </h3>
              {userStats.badges.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {userStats.badges.map((badgeName) => (
                    <div key={badgeName} className={`px-3 py-2 rounded-full text-sm font-medium ${badges[badgeName].color}`}>
                      <span className="mr-2">{badges[badgeName].icon}</span>
                      {badgeName}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No badges yet. Start scanning to earn your first badge!</p>
              )}
            </div>

            {/* Quick Action */}
            <div className="text-center">
              <button
                onClick={() => setCurrentView('scan')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg cursor-pointer"
              >
                <Camera className="w-6 h-6 inline mr-2" />
                Scan New Waste Item
              </button>
            </div>
          </div>
        )}

        {/* Scan View */}
        {currentView === 'scan' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Scan Waste Item</h2>
              
              {!showCamera && !isScanning && (
                <div className="space-y-4">
                  <button
                    onClick={startCamera}
                    className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    <Camera className="w-6 h-6 inline mr-2" />
                    Use Camera
                  </button>
                  
                  <div className="text-center text-gray-500">or</div>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    <Upload className="w-6 h-6 inline mr-2" />
                    Upload Image
                  </button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}

              {showCamera && (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-lg"
                  />
                  {cameraError && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 text-sm">
                      <div className="font-semibold mb-1">Can’t access your camera</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Click the lock/camera icon in the address bar and allow camera for this site.</li>
                        <li>Close other apps using the camera (Zoom/Teams).</li>
                        <li>Ensure camera privacy settings allow browsers to use the camera.</li>
                        <li>Use http://localhost (secure context) in a desktop browser.</li>
                      </ul>
                      <div className="mt-3 flex gap-2">
                        <button onClick={preflightCameraPermission} className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md">Enable Camera</button>
                        <button onClick={startCamera} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md">Retry</button>
                      </div>
                    </div>
                  )}
                  <div className="flex space-x-3">
                    <button
                      onClick={capturePhoto}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-medium transition-colors"
                    >
                      Capture
                    </button>
                    <button
                      onClick={stopCamera}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {isScanning && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing waste item...</p>
                </div>
              )}

              {scanResult && scanResult.isWaste && (
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">{scanResult.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800">{scanResult.type}</h3>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${scanResult.color} bg-opacity-10`}>
                    {scanResult.category}
                  </div>
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                    <span className="font-semibold">+{scanResult.points} points earned!</span>
                  </div>
                  {scanResult.solution && (
                    <div className="text-left bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
                      <div className="font-semibold mb-1">Suggested handling:</div>
                      <pre className="whitespace-pre-wrap leading-relaxed">{scanResult.solution}</pre>
                    </div>
                  )}
                  <p className="text-gray-600 text-sm">
                    {scanResult.category === 'Recyclable' && "Place this item in the recycling bin."}
                    {scanResult.category === 'Compostable' && "This can go in your compost bin."}
                    {scanResult.category === 'Special Disposal' && "Take this to a special disposal center."}
                  </p>
                  <button
                    onClick={() => {
                      setScanResult(null);
                      setCurrentView('home');
                    }}
                    className="w-full bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg font-medium transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leaderboard View */}
        {currentView === 'leaderboard' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6">
              <h2 className="text-3xl font-bold flex items-center">
                <Trophy className="w-7 h-7 mr-3" />
                Eco Champions Leaderboard
              </h2>
              <p className="mt-2 opacity-90">Top recycling heroes in your college</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      user.name === 'You' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                        index === 0 ? 'bg-green-300 text-green-900' :
                        index === 1 ? 'bg-green-200 text-green-900' :
                        index === 2 ? 'bg-green-400 text-green-900' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {index === 0 ? <Crown className="w-4 h-4" /> :
                         index === 1 ? <Medal className="w-4 h-4" /> :
                         index === 2 ? <Award className="w-4 h-4" /> :
                         index + 1}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.scans} items scanned</p>
                      </div>
                      
                      {user.badges.length > 0 && (
                        <div className="flex space-x-1">
                          {user.badges.slice(0, 3).map((badgeName) => (
                            <span key={badgeName} className="text-sm">
                              {badges[badgeName]?.icon || '🏅'}
                            </span>
                          ))}
                          {user.badges.length > 3 && (
                            <span className="text-xs text-gray-500">+{user.badges.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-green-600">{user.points} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Map View */}
        {currentView === 'map' && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-400 text-white p-6">
              <h2 className="text-4xl font-bold flex items-center">
                <MapPin className="w-8 h-8 mr-3" />
                Nearby Recycling Centers
              </h2>
              <p className="mt-3 opacity-90 text-lg">Find the closest recycling facilities</p>
            </div>
            
            <div className="p-6">
              {/* Live location map */}
              <div className="mb-4 flex items-center justify-between">
                <div className="text-base text-gray-700">
                  {userLocation
                    ? `Your location: ${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}`
                    : 'Location not detected yet'}
                </div>
                <button 
                  onClick={requestLocation} 
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-lg font-semibold text-lg"
                >
                  Detect My Location
                </button>
              </div>

              {userLocation ? (
                <div className="rounded-xl overflow-hidden mb-6 border border-gray-200">
                  <iframe
                    title="User Location Map"
                    className="w-full h-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=14&output=embed`}
                  />
                </div>
              ) : (
                <div className="bg-gray-100 rounded-xl h-80 flex items-center justify-center mb-6 text-gray-600 text-lg text-center px-4">
                  <div>
                    <MapPin className="w-14 h-14 mx-auto mb-3 text-gray-500" />
                    <p className="mb-2">Waiting for location permission…</p>
                    {locationError && <p className="text-red-600 text-base">{locationError}</p>}
                  </div>
                </div>
              )}
              
              {/* Recycling centers list */}
              <div className="space-y-4  ">
                {[
                  { name: 'Crapbin', type: 'E-waste, metals, paper; doorstep pickup', address: 'Kukatpally' },
                  { name: 'Pure Earth Recyclers', type: 'E-waste mgmt, IT asset disposal, data destruction', address: 'Kukatpally' },
                  { name: 'Reuze', type: 'Doorstep scrap & e-waste; authorized recycler', address: 'City-wide' },
                  { name: 'E WASTE RECYCLING', type: 'Govt-authorized e-waste recycler; data sanitization', address: '' },
                ].map((center, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-5 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{center.name}</h3>
                      <p className="text-base text-gray-600">
                        {center.type}{center.address ? ` · ${center.address}` : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      {userLocation ? (
                        <a
                          className="text-sm text-green-600 hover:underline font-medium"
                          href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${encodeURIComponent(center.name + (center.address ? ', ' + center.address : '') )}&travelmode=driving`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Get Directions
                        </a>
                      ) : (
                        <button 
                          onClick={requestLocation} 
                          className="text-sm text-green-600 hover:underline font-medium"
                        >
                          Enable location
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* About View */}
        {currentView === 'about' && (
          <WasteStatisticsDashboard />
        )}

        {/* Current Issue View */}
        {currentView === 'current-issue' && (
          <SmartWasteIssuesDashboard />
        )}

        {/* Coming Issue View */}
        {currentView === 'coming-issue' && (
           <SmartWasteSystem />
        )}

        {/* Contact View */}
       {
        currentView === 'contact' && (
          <ContactForm />
        )
       }

        {/* Redeem View */}
        {currentView === 'redeem' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Eco Scan Rewards</h2>
              <p className="text-gray-600">Scan smart. Earn green rewards. Your points: <span className="font-semibold text-green-600">{userStats.points}</span></p>
              <div className="mt-4">
                <button
                  onClick={() => setCurrentView('home')}
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
                  type="button"
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>
            {redeemSuccess && (
              <div className="mb-6 border border-green-200 bg-green-50 rounded-xl p-5 text-center">
                <div className="mx-auto mb-3 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div className="text-green-700 font-bold text-xl">Approved</div>
                <div className="text-gray-700 mt-1">{redeemSuccess.title} redeemed. Your item will be delivered to your address.</div>
              </div>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              {rewards.map((r) => (
                <div key={r.id} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gradient-to-b from-slate-900 to-slate-800">
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="text-sm text-gray-100 truncate">{r.title}</div>
                    <button
                      onClick={() => handleRedeemItem(r)}
                      className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-full"
                      type="button"
                    >
                      Redeem {r.points}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">Images by Unsplash. Points are sample values for display.</p>
          </div>
        )}

        {/* Redeemed Items View */}
        {currentView === 'redeemed' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-800">Redeemed Items</h2>
              <button onClick={() => setCurrentView('home')} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg">← Back to Dashboard</button>
            </div>
            {redeemedItems.length === 0 ? (
              <p className="text-gray-600">You haven’t redeemed any items yet.</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {redeemedItems.map(item => (
                  <div key={item.id} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="px-4 py-3">
                      <div className="font-semibold text-gray-800">{item.title}</div>
                      <div className="text-sm text-gray-600">Redeemed for <span className="font-medium text-green-700">{item.points}</span> points</div>
                      <div className="text-xs text-gray-500 mt-1">{new Date(item.ts).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
       <WasteSegregationChatbot />
    </div>
  );
};
export default WasteScannerApp;