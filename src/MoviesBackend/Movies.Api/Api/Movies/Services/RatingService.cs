using System.ComponentModel;
using System.Runtime.CompilerServices;
using Movies.Api.Api.Movies.Models;
using Movies.Api.Api.Movies.Operations;

namespace Movies.Api.Api.Movies.Services;

public class RatingService : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    public AddRatingRequest Current
    {
        get;
        set
        {
            field = value;
            OnPropertyChanged(nameof(Current));
        }
        
    }
    
    public async IAsyncEnumerable<AddRatingRequest> GetMovieRating([EnumeratorCancellation] CancellationToken cancellationToken)
    {
        while(cancellationToken is not { IsCancellationRequested: true })
        {
          
            yield return Current;
            var tcs = new TaskCompletionSource();
            PropertyChangedEventHandler handler = (_, _) => tcs.SetResult();
            PropertyChanged += handler;
            try
            {
                await tcs.Task.WaitAsync(cancellationToken);
            }
            finally
            {
                PropertyChanged -= handler;
            }
        }
    }
    protected virtual void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }

    protected bool SetField<T>(ref T field, T value, [CallerMemberName] string? propertyName = null)
    {
        if (EqualityComparer<T>.Default.Equals(field, value)) return false;
        field = value;
        OnPropertyChanged(propertyName);
        return true;
    }

    public void Set(AddRatingRequest request)
    {
        Current = request;
    }
}