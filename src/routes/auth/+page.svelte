<script>
    /** @type {import('./$types').ActionData} */

    import '../../app.css';

    import { enhance } from '$app/forms';
    import { signIn } from '@auth/sveltekit/client';
    
    const form = $props();

    let isSignUp = $state(false);

<div class="container">
    <h1>Sign in</h1>
    
    {#if !isSignUp}
        <form method="POST" action="?/login" use:enhance>
            <div class="form-group">
            <input 
                name="email"
                type="email" 
                placeholder="Email"
                class:error={form?.incorrect || form?.missing}
                required
            />
        </div>

        <div class="form-group">
            <input 
                name="password"
                type="password" 
                placeholder="Password"
                class:error={form?.incorrect || form?.missing}
                required
            />
        </div>

        {#if form?.missing}
            <p class="error">Please fill in all fields</p>
        {/if}
        
        {#if form?.incorrect}
            <p class="error">Invalid email or password</p>
        {/if}

            <button type="submit">Sign in with Email</button>
        </form>
    {:else if isSignUp}
        <form method="POST" action="?/signup" use:enhance>

        </form>
    {/if}

    <div class="oauth-buttons">
        <button type="button" on:click={() => (isSignUp = !isSignUp)    }>
            {isSignUp ? 'Back to Sign in' : 'Create an account'}
        </button>
    </div>

    <div class="oauth-buttons">
        <button type="button" on:click={() => signIn('google')}>
            Sign in with Google
        </button>
    </div>
</div>

<style>

    .form-group {
        margin-bottom: 1rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
    }

    .error {
        border-color: red;
    }

    p.error {
        color: red;
        font-size: 0.875rem;
        margin-top: -0.5rem;
        margin-bottom: 1rem;
    }

    .oauth-buttons {
        margin-top: 1rem;
        border-top: 1px solid #ddd;
        padding-top: 1rem;
    }
</style>
