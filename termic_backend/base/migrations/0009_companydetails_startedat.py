# Generated by Django 4.2.7 on 2024-01-09 15:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_remove_companydetails_orders'),
    ]

    operations = [
        migrations.AddField(
            model_name='companydetails',
            name='startedAt',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
