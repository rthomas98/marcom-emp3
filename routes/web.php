<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InvitationController;
use App\Mail\TestEmail;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Mail;
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

Route::get('/solutions/frontend', function () {
    return Inertia::render('Solutions/FrontEndDevelopment');
})->name('solutions.frontend');

Route::get('/solutions/backend', function () {
    return Inertia::render('Solutions/BackEndDevelopment');
})->name('solutions.backend');

Route::get('/solutions/fullstack', function () {
    return Inertia::render('Solutions/FullStackDevelopment');
})->name('solutions.fullstack');

Route::get('/solutions/custom-software', function () {
    return Inertia::render('Solutions/CustomSoftwareDevelopment');
})->name('solutions.custom');

Route::get('/solutions/wordpress', function () {
    return Inertia::render('Solutions/WordPressDevelopment');
})->name('solutions.wordpress');

Route::get('/solutions/ecommerce', function () {
    return Inertia::render('Solutions/EcommerceDevelopment');
})->name('solutions.ecommerce');

Route::get('/solutions/hubspot', function () {
    return Inertia::render('Solutions/HubSpotDevelopment');
})->name('solutions.hubspot');

Route::get('/solutions/mvp', function () {
    return Inertia::render('Solutions/MvpDevelopment');
})->name('solutions.mvp');

Route::get('/solutions/progressive-web-apps', function () {
    return Inertia::render('Solutions/ProgressiveWebApps');
})->name('solutions.pwa');

Route::get('/solutions/software-development-design', function () {
    return Inertia::render('Solutions/SoftwareDevelopmentDesign');
})->name('solutions.software-design');

Route::get('/solutions/react-native', function () {
    return Inertia::render('Solutions/ReactNativeDevelopment');
})->name('solutions.react-native');

// Services Routes
Route::get('/services', function () {
    return Inertia::render('Services/Overview');
})->name('services');

Route::get('/services/software-engineering', function () {
    return Inertia::render('Services/SoftwareEngineeringServices');
})->name('services.software-engineering');

Route::get('/services/application', function () {
    return Inertia::render('Services/ApplicationServices');
})->name('services.application');

Route::get('/services/devops', function () {
    return Inertia::render('Services/DevOpsServices');
})->name('services.devops');

Route::get('/services/it-consulting-services', function () {
    return Inertia::render('Services/ITConsultingServices');
})->name('services.consulting');

Route::get('/services/ai-ml-development', function () {
    return Inertia::render('Services/AiMlDevelopment');
})->name('services.ai');

Route::get('/services/foundation-models', function () {
    return Inertia::render('Services/FoundationModels');
})->name('services.foundation');

Route::get('/services/mlops-infrastructure', function () {
    return Inertia::render('Services/MlopsInfrastructure');
})->name('services.mlops');

Route::get('/services/maintenance-and-support', function () {
    return Inertia::render('Services/MaintenanceAndSupport');
})->name('services.maintenance');

Route::get('/services/smart-teams', function () {
    return Inertia::render('Services/SmartTeams');
})->name('services.teams');

// Industries Routes
Route::get('/industries', function () {
    return Inertia::render('Industries/Overview');
})->name('industries');

Route::get('/industries/healthcare', function () {
    return Inertia::render('Industries/Healthcare');
})->name('industries.healthcare');

Route::get('/industries/finance', function () {
    return Inertia::render('Industries/FinanceBanking');
})->name('industries.finance');

Route::get('/industries/ecommerce', function () {
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

Route::get('/company/our-team', function () {
    return Inertia::render('Company/Team');
})->name('company.team');

Route::get('/company/careers', function () {
    return Inertia::render('Company/Careers');
})->name('company.careers');

Route::get('/company/partner', function () {
    return Inertia::render('Company/BecomePartner');
})->name('company.partner');

Route::get('/company/latest-news', function () {
    return Inertia::render('Company/LatestNews');
})->name('company.latest-news');

// Resources Routes
Route::get('/resources/blog', function () {
    return Inertia::render('Resources/Blog');
})->name('resources.blog');

Route::get('/resources/case-studies', function () {
    return Inertia::render('Resources/CaseStudies');
})->name('resources.case-studies');

Route::get('/resources/documentation', function () {
    return Inertia::render('Resources/Documentation');
})->name('resources.docs');

Route::get('/resources/help-center', function () {
    return Inertia::render('Resources/HelpCenter');
})->name('resources.help');

Route::get('/resources/contact-support', function () {
    return Inertia::render('Resources/ContactSupport');
})->name('resources.support');

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

Route::get('/test-email', function () {
    try {
        Mail::to('rob@empuls3.com')->send(new TestEmail());
        return 'Test email sent successfully!';
    } catch (\Exception $e) {
        return 'Error sending email: ' . $e->getMessage();
    }
})->name('test.email');

Route::get('invitation/{token}', [InvitationController::class, 'accept'])->name('invitation.accept');
Route::post('invitation/{token}', [InvitationController::class, 'accept']);

require __DIR__.'/auth.php';
