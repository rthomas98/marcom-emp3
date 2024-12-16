<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Solutions Routes
Route::get('/solutions', function () {
    return Inertia::render('Solutions/Overview');
})->name('solutions');

Route::get('/solutions/backend-development', function () {
    return Inertia::render('Solutions/BackEndDevelopment');
})->name('solutions.backend');

Route::get('/solutions/frontend-development', function () {
    return Inertia::render('Solutions/FrontEndDevelopment');
})->name('solutions.frontend');

Route::get('/solutions/fullstack-development', function () {
    return Inertia::render('Solutions/FullStackDevelopment');
})->name('solutions.fullstack');

Route::get('/solutions/custom-software-development', function () {
    return Inertia::render('Solutions/CustomSoftwareDevelopment');
})->name('solutions.custom');

Route::get('/solutions/wordpress-development', function () {
    return Inertia::render('Solutions/WordPressDevelopment');
})->name('solutions.wordpress');

Route::get('/solutions/ecommerce-development', function () {
    return Inertia::render('Solutions/EcommerceDevelopment');
})->name('solutions.ecommerce');

Route::get('/solutions/hubspot-development', function () {
    return Inertia::render('Solutions/HubSpotDevelopment');
})->name('solutions.hubspot');

Route::get('/solutions/mvp-development', function () {
    return Inertia::render('Solutions/MvpDevelopment');
})->name('solutions.mvp');

Route::get('/solutions/progressive-web-apps', function () {
    return Inertia::render('Solutions/ProgressiveWebApps');
})->name('solutions.pwa');

Route::get('/solutions/software-development-design', function () {
    return Inertia::render('Solutions/SoftwareDevelopmentDesign');
})->name('solutions.design');

Route::get('/solutions/react-native-development', function () {
    return Inertia::render('Solutions/ReactNativeDevelopment');
})->name('solutions.react-native');

// Services Routes
Route::get('/services', function () {
    return Inertia::render('Services/Overview');
})->name('services');

Route::get('/services/application-services', function () {
    return Inertia::render('Services/ApplicationServices');
})->name('services.application');

Route::get('/services/devops-services', function () {
    return Inertia::render('Services/DevOpsServices');
})->name('services.devops');

Route::get('/services/it-consulting', function () {
    return Inertia::render('Services/ITConsultingServices');
})->name('services.consulting');

Route::get('/services/maintenance-support', function () {
    return Inertia::render('Services/MaintenanceAndSupport');
})->name('services.maintenance');

Route::get('/services/smart-teams', function () {
    return Inertia::render('Services/SmartTeams');
})->name('services.teams');

Route::get('/services/software-engineering', function () {
    return Inertia::render('Services/SoftwareEngineeringServices');
})->name('services.engineering');

// Industries Routes
Route::get('/industries', function () {
    return Inertia::render('Industries/Overview');
})->name('industries');

Route::get('/industries/healthcare', function () {
    return Inertia::render('Industries/Healthcare');
})->name('industries.healthcare');

Route::get('/industries/finance-banking', function () {
    return Inertia::render('Industries/FinanceBanking');
})->name('industries.finance');

Route::get('/industries/ecommerce-retail', function () {
    return Inertia::render('Industries/EcommerceRetail');
})->name('industries.retail');

Route::get('/industries/manufacturing', function () {
    return Inertia::render('Industries/Manufacturing');
})->name('industries.manufacturing');

Route::get('/industries/technology', function () {
    return Inertia::render('Industries/Technology');
})->name('industries.technology');

Route::get('/industries/education', function () {
    return Inertia::render('Industries/Education');
})->name('industries.education');

Route::get('/industries/startups', function () {
    return Inertia::render('Industries/Startups');
})->name('industries.startups');

// Company Routes
Route::get('/company/about', function () {
    return Inertia::render('Company/AboutUs');
})->name('company.about');

Route::get('/company/partner', function () {
    return Inertia::render('Company/BecomePartner');
})->name('company.partner');

Route::get('/company/news', function () {
    return Inertia::render('Company/NewsUpdates');
})->name('company.news');

// Resources Routes
Route::get('/resources/blog', function () {
    return Inertia::render('Resources/Blog');
})->name('resources.blog');

Route::get('/resources/case-studies', function () {
    return Inertia::render('Resources/CaseStudies');
})->name('resources.cases');

Route::get('/resources/faqs', function () {
    return Inertia::render('Resources/Faqs');
})->name('resources.faqs');

Route::get('/resources/contact', function () {
    return Inertia::render('Resources/Contact');
})->name('resources.contact');

// Legal Routes
Route::get('/privacy-policy', function () {
    return Inertia::render('Legal/PrivacyPolicy');
})->name('legal.privacy');

Route::get('/terms-of-service', function () {
    return Inertia::render('Legal/TermsOfService');
})->name('legal.terms');

Route::get('/cookie-policy', function () {
    return Inertia::render('Legal/CookiePolicy');
})->name('legal.cookies');

require __DIR__.'/auth.php';
